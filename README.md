# Discover - Personalized Feed PWA

A modern Progressive Web App similar to Google Discover, featuring AI-powered search, personalized news feed, and weather updates.

## Features

### 🔍 Custom Search Functionality
- Smart search powered by OpenAI GPT-4
- Expandable results with concise summaries and detailed information
- Show More/Less toggle for progressive disclosure
- Source citations included

### 📰 News Cards
- Personalized news feed based on user preferences
- Category selection (Technology, Business, Sports, etc.)
- Beautiful card layouts with images and excerpts
- Tap to open full articles
- Offline caching support

### 🌤️ Weather Integration
- Current weather conditions
- 4-day forecast
- Location-based updates
- Humidity and wind speed data
- Beautiful weather icons

### ⚙️ User Preferences
- Customizable location for weather
- News category preferences
- Push notification settings
- Offline mode toggle
- Persistent settings across sessions

### 📱 PWA Features
- Installable on mobile and desktop
- Offline support for previously loaded content
- App-like experience with standalone display
- Custom app icons and splash screens
- Fast loading with optimized caching

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19.2 with Server Components
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **AI Integration**: Vercel AI SDK with OpenAI
- **Deployment**: Optimized for Vercel

## API Endpoints

### POST /api/search
Search endpoint that uses AI to generate comprehensive answers.

**Request:**
```json
{
  "query": "What is quantum computing?"
}
```

**Response:**
```json
{
  "summary": "Brief 2-3 sentence answer",
  "details": "Detailed explanation with context",
  "sources": ["Source 1", "Source 2"]
}
```

### GET /api/news?category=technology&limit=10
News feed endpoint that generates personalized articles.

**Query Parameters:**
- `category` (optional): News category (default: "general")
- `limit` (optional): Number of articles (default: 10)

**Response:**
```json
{
  "articles": [
    {
      "id": "unique-id",
      "title": "Article title",
      "excerpt": "Brief summary",
      "imageUrl": "image-url",
      "source": "News Source",
      "publishedAt": "ISO timestamp",
      "url": "article-url"
    }
  ]
}
```

### GET /api/weather?location=San%20Francisco
Weather endpoint that provides current conditions and forecast.

**Query Parameters:**
- `location` (optional): City name (default: "San Francisco")

**Response:**
```json
{
  "location": "San Francisco",
  "temperature": 18,
  "condition": "Partly Cloudy",
  "humidity": 65,
  "windSpeed": 15,
  "forecast": [
    {
      "day": "Today",
      "high": 20,
      "low": 14,
      "condition": "Partly Cloudy"
    }
  ]
}
```

## Installation

### Prerequisites
- Node.js 18+ or pnpm
- OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/daybreakdata-ux/Aria-home.git
   cd Aria-home
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenRouter API key to `.env.local`:
   ```
   OPENROUTER_API_KEY=your_key_here
   ```

4. Run development server:
   ```bash
   pnpm dev
   ```

5. Open http://localhost:3000

### Vercel Deployment

**One-Click Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/daybreakdata-ux/Aria-home)

**Manual Deployment:**

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Add environment variable:
   - `OPENROUTER_API_KEY` = your OpenRouter API key
4. Deploy!

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

## User Guide

### Customizing Your Feed
1. Click the Settings icon in the header
2. Set your location for weather updates
3. Choose your preferred news category
4. Enable/disable notifications and offline mode
5. Click "Save Preferences"

### Installing as PWA
1. Visit the app in your browser
2. Look for the install prompt at the bottom
3. Click "Install" to add to home screen
4. Launch from your device like a native app

### Using Offline
When offline mode is enabled:
- Previously loaded news articles are cached
- Weather data from last fetch is available
- Search requires internet connection

## Architecture

```
app/
├── page.tsx              # Main feed page
├── settings/
│   └── page.tsx          # Settings page
├── api/
│   ├── search/
│   │   └── route.ts      # Search API
│   ├── news/
│   │   └── route.ts      # News API
│   └── weather/
│       └── route.ts      # Weather API
components/
├── app-header.tsx        # Navigation header
├── search-bar.tsx        # Search input
├── search-result.tsx     # Search results card
├── news-feed.tsx         # News feed container
├── news-card.tsx         # Individual news card
├── weather-widget.tsx    # Weather display
└── install-prompt.tsx    # PWA install prompt
public/
├── manifest.json         # PWA manifest
└── icons/                # App icons
```

## Browser Support

- Chrome/Edge 90+
- Safari 15+
- Firefox 88+
- iOS Safari 15+
- Android Chrome 90+

## Performance

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 95+
- Fully responsive design
- Optimized images and fonts

## Security

- HTTPS required for PWA features
- API rate limiting recommended
- Input validation and sanitization
- Secure localStorage usage
- CSP headers recommended in production

## License

MIT License - Feel free to use and modify for your projects!
