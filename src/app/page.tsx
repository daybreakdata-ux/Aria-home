"use client"

import { AppHeader } from "@/components/layout/app-header"
import { SearchBar } from "@/components/features/search-bar"
import { WeatherWidget } from "@/components/features/weather-widget"
import { NewsFeed } from "@/components/features/news-feed"
import { InstallPrompt } from "@/components/features/install-prompt"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <InstallPrompt />
        <SearchBar />
        <WeatherWidget />
        <NewsFeed />
      </main>
    </div>
  )
}
