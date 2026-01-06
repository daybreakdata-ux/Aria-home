"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UserPreferences {
  location: string
  useGeolocation: boolean
  newsCategory: string
  enableNotifications: boolean
  enableOfflineMode: boolean
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    location: "San Francisco",
    useGeolocation: false,
    newsCategory: "general",
    enableNotifications: false,
    enableOfflineMode: true,
  })

  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem("userPreferences")
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    // Trigger weather widget to refresh with new location
    window.dispatchEvent(new Event("locationUpdated"))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-2xl flex h-14 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="ml-3 text-lg font-semibold">Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Location Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Location</h2>
          
          {/* Geolocation Toggle */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
            <div className="space-y-0.5">
              <Label htmlFor="geolocation">Use Current Location</Label>
              <p className="text-sm text-muted-foreground">
                Automatically detect your location for weather
              </p>
            </div>
            <Switch
              id="geolocation"
              checked={preferences.useGeolocation}
              onCheckedChange={(checked) => {
                setPreferences({ ...preferences, useGeolocation: checked })
                if (checked && "geolocation" in navigator) {
                  navigator.geolocation.getCurrentPosition(
                    async (position) => {
                      const { latitude, longitude } = position.coords
                      console.log("Settings: Detected coordinates:", latitude, longitude)
                      try {
                        const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`)
                        const data = await response.json()
                        console.log("Settings: Geocode response:", data)
                        if (data.city) {
                          setPreferences((prev) => ({ ...prev, location: data.fullName || data.city }))
                        }
                      } catch (error) {
                        console.error("Failed to get location:", error)
                      }
                    }
                  )
                }
              }}
            />
          </div>
          
          {/* Manual Location Input */}
          <div className="space-y-2">
            <Label htmlFor="location">
              {preferences.useGeolocation ? "Detected Location" : "Manual Location"}
            </Label>
            <Input
              id="location"
              placeholder="Enter your city"
              value={preferences.location}
              onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
              disabled={preferences.useGeolocation}
            />
            <p className="text-sm text-muted-foreground">
              {preferences.useGeolocation 
                ? "Location is automatically detected" 
                : "Used for weather updates and local news"}
            </p>
          </div>
        </Card>

        {/* News Preferences */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">News Preferences</h2>
          <div className="space-y-2">
            <Label htmlFor="category">Preferred Category</Label>
            <Select
              value={preferences.newsCategory}
              onValueChange={(value) => setPreferences({ ...preferences, newsCategory: value })}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="health">Health</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Choose your main news category</p>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">App Settings</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about breaking news</p>
              </div>
              <Switch
                id="notifications"
                checked={preferences.enableNotifications}
                onCheckedChange={(checked) => setPreferences({ ...preferences, enableNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="offline">Offline Mode</Label>
                <p className="text-sm text-muted-foreground">Cache content for offline access</p>
              </div>
              <Switch
                id="offline"
                checked={preferences.enableOfflineMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, enableOfflineMode: checked })}
              />
            </div>
          </div>
        </Card>

        {/* About Section */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Version:</strong> 1.0.0
            </p>
            <p>
              <strong className="text-foreground">Built with:</strong> Next.js, React, Tailwind CSS
            </p>
            <p>
              <strong className="text-foreground">API:</strong> AI-powered search and content generation
            </p>
          </div>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full" size="lg">
          {isSaved ? "Saved!" : "Save Preferences"}
        </Button>
      </main>
    </div>
  )
}
