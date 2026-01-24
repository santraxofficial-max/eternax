'use client';

import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  setVolume: (volume: number) => void;
  volume: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/audio/background-music.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto'; // Preload the audio
    audioRef.current = audio;

    // Load the audio immediately
    audio.load();

    // Auto-play on first user interaction
    const handleFirstInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        // Ensure audio is ready before playing
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA or higher
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.log('Auto-play prevented:', err);
          });
        } else {
          // Wait for audio to be ready
          audio.addEventListener('canplaythrough', () => {
            audio.play().then(() => {
              setIsPlaying(true);
            }).catch((err) => {
              console.log('Auto-play prevented:', err);
            });
          }, { once: true });
        }
      }
    };

    // Listen for first interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [hasUserInteracted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure user has interacted (for browser autoplay policy)
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
      }

      // Check if audio is ready to play
      if (audioRef.current.readyState >= 2) { // HAVE_CURRENT_DATA or higher
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.log('Audio play error:', err);
        });
      } else {
        // Wait for audio to be ready
        const handleCanPlay = () => {
          audioRef.current?.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.log('Audio play error:', err);
          });
          audioRef.current?.removeEventListener('canplaythrough', handleCanPlay);
        };
        audioRef.current.addEventListener('canplaythrough', handleCanPlay);
      }
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, setVolume, volume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
