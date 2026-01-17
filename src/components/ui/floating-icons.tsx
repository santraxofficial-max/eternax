"use client"

import React, { useState, useEffect } from "react"
import { Volume2, VolumeX, Sun, Moon, LogIn } from "lucide-react"

export const FloatingIcons = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  // Check initial theme on mount
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light")
    setIsDarkMode(!isLight)

    // Initialize audio (you can replace this with your actual audio file)
    const audioElement = new Audio()
    // You would typically load an actual audio file here
    // audioElement.src = "/path/to/your/audio.mp3"
    setAudio(audioElement)

    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (!newTheme) {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }

  const toggleAudio = () => {
    if (!audio) return

    if (isAudioPlaying) {
      audio.pause()
      setIsAudioPlaying(false)
    } else {
      // Since we don't have an actual audio file, we'll just simulate the toggle
      // In a real implementation, you would:
      // audio.play().catch(console.error)
      setIsAudioPlaying(true)
    }
  }

  const handleLogin = () => {
    // Placeholder for login functionality
    console.log("Login clicked - implement authentication here")
  }

  const iconButtonClass = `
    w-12 h-12 rounded-full
    bg-black/10 backdrop-blur-sm
    border border-white/10
    flex items-center justify-center
    transition-all duration-300 ease-in-out
    hover:bg-white/15 hover:scale-110 hover:shadow-lg
    active:scale-95
    group
  `

  const iconClass = "w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300"

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className={iconButtonClass}
        aria-label="Toggle background audio"
      >
        {isAudioPlaying ? (
          <Volume2 className={iconClass} />
        ) : (
          <VolumeX className={iconClass} />
        )}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={iconButtonClass}
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className={iconClass} />
        ) : (
          <Moon className={iconClass} />
        )}
      </button>

      {/* Login */}
      <button
        onClick={handleLogin}
        className={iconButtonClass}
        aria-label="Login"
      >
        <LogIn className={iconClass} />
      </button>
    </div>
  )
}
