"use client"

import { useEffect } from "react"
import { AppHeader } from "@/components/layout/app-header"
import { SearchBar } from "@/components/features/search-bar"
import { FeatureButtons } from "@/components/features/feature-buttons"
import { WeatherWidget } from "@/components/features/weather-widget"
import { NewsFeed } from "@/components/features/news-feed"
import { InstallPrompt } from "@/components/features/install-prompt"

export default function HomePage() {
  useEffect(() => {
    // Request location permission on first load
    const hasRequestedLocation = localStorage.getItem("locationRequested")
    
    if (!hasRequestedLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Reverse geocode to get city name using secure API route
          console.log("Detected coordinates:", latitude, longitude)
          try {
            const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`)
            const data = await response.json()
            
            console.log("Geocode response:", data)
            
            if (data.city) {
              // Update preferences with detected location (use fullName if available for better accuracy)
              const preferences = JSON.parse(localStorage.getItem("userPreferences") || '{}') 
              preferences.location = data.fullName || data.city
              preferences.useGeolocation = true
              localStorage.setItem("userPreferences", JSON.stringify(preferences))
              
              console.log("Location saved:", preferences.location)
              
              // Trigger weather widget refresh
              window.dispatchEvent(new Event("locationUpdated"))
            }
          } catch (error) {
            console.error("Failed to reverse geocode:", error)
          }
          
          localStorage.setItem("locationRequested", "true")
        },
        (error) => {
          console.log("Location permission denied:", error)
          localStorage.setItem("locationRequested", "true")
        }
      )
    }
  }, [])

  return (
    <div className="h-[100dvh] bg-gradient-to-r from-slate-500 to-slate-800 flex flex-col">
      <AppHeader />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
          <InstallPrompt />
          <SearchBar />
          <FeatureButtons />
          <WeatherWidget />
          <NewsFeed />
        </div>
      </main>
    </div>
  )
}
