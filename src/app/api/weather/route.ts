import { generateObject } from "ai"
import { z } from "zod"

// Vercel configuration
export const runtime = "nodejs"
export const maxDuration = 30

// Define the schema for weather data
const weatherSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  condition: z.string(),
  humidity: z.number(),
  windSpeed: z.number(),
  forecast: z.array(
    z.object({
      day: z.string(),
      high: z.number(),
      low: z.number(),
      condition: z.string(),
    }),
  ),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location") || "San Francisco"

    // Use AI to generate realistic weather data
    const { object } = await generateObject({
      model: "openai/gpt-4o-mini",
      schema: weatherSchema,
      prompt: `Generate realistic current weather data and a 4-day forecast for ${location}.
      
      Provide:
      - Current temperature in Celsius (realistic for the location and current season)
      - Weather condition (e.g., "Sunny", "Partly Cloudy", "Rainy", "Cloudy")
      - Humidity percentage (20-90%)
      - Wind speed in km/h (5-40)
      - 4-day forecast with day names (starting with "Today", "Tomorrow", then day names)
      - Each forecast day should have high/low temps and conditions
      
      Make the data realistic for ${location} in January 2026.`,
    })

    return Response.json(object)
  } catch (error) {
    console.error("[v0] Weather API error:", error)

    // Fallback weather data
    return Response.json(
      {
        location: "San Francisco",
        temperature: 18,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 15,
        forecast: [
          { day: "Today", high: 20, low: 14, condition: "Partly Cloudy" },
          { day: "Tomorrow", high: 19, low: 13, condition: "Cloudy" },
          { day: "Wed", high: 21, low: 15, condition: "Sunny" },
          { day: "Thu", high: 18, low: 12, condition: "Rainy" },
        ],
      },
      { status: 200 },
    )
  }
}
