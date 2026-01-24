"use client"

import React, { useState } from "react"
import { Volume2, VolumeX, Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useAudio } from "@/contexts/AudioContext"

export const FloatingIcons = () => {
  const { theme, toggleTheme } = useTheme()
  const { isPlaying, toggleAudio } = useAudio()
  const [isAudioAnimating, setIsAudioAnimating] = useState(false)
  const [isThemeAnimating, setIsThemeAnimating] = useState(false)

  const iconButtonClass = `
    w-10 h-10 sm:w-12 sm:h-12 rounded-full
    bg-black/20 dark:bg-black/20 backdrop-blur-sm
    border border-white/10 dark:border-white/10
    flex items-center justify-center
    transition-all duration-300 ease-in-out
    hover:bg-white/15 hover:scale-110 hover:shadow-lg
    active:scale-95
    group
    animate-pulse-once
  `

  const iconClass = "w-4 h-4 sm:w-5 sm:h-5 text-foreground/80 group-hover:text-foreground transition-all duration-300"

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
      {/* Audio Toggle */}
      <button
        onClick={() => {
          setIsAudioAnimating(true)
          toggleAudio()
          setTimeout(() => setIsAudioAnimating(false), 600)
        }}
        className={`${iconButtonClass} ${isAudioAnimating ? 'animate-spin-once' : ''}`}
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
      >
        {isPlaying ? (
          <Volume2 className={`${iconClass} ${isAudioAnimating ? 'animate-rotate-in' : ''}`} />
        ) : (
          <VolumeX className={`${iconClass} ${isAudioAnimating ? 'animate-rotate-in' : ''}`} />
        )}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => {
          setIsThemeAnimating(true)
          toggleTheme()
          setTimeout(() => setIsThemeAnimating(false), 600)
        }}
        className={`${iconButtonClass} ${isThemeAnimating ? 'animate-spin-once' : ''}`}
        aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
      >
        {theme === 'dark' ? (
          <Sun className={`${iconClass} ${isThemeAnimating ? 'animate-rotate-in' : ''}`} />
        ) : (
          <Moon className={`${iconClass} ${isThemeAnimating ? 'animate-rotate-in' : ''}`} />
        )}
      </button>
    </div>
  )
}
