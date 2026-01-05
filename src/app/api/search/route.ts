import { generateText } from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"

export const runtime = "nodejs"

const systemPrompt = `You are Aria, an intelligent and helpful AI search engine. Your role is to provide accurate, concise, and contextually relevant information to users' search queries.

Guidelines:
- Provide clear and direct answers
- Do not be cconversational aside from answering the question
- If user inputs a business name or location, provide relevant details such as address, hours, and contact info
- Use device location if available to enhance relevance
- If you're unsure about something, acknowledge it
- Format your response as if you are a search engine.
- Keep responses concise but informative
- Use bullet points or structured formatting when appropriate
- For factual queries, provide accurate information
- For complex queries, break down your response logically`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== "string" || !query.trim()) {
      return Response.json(
        { error: "Query is required and must be a non-empty string" },
        { status: 400 }
      )
    }

    // Check for OpenRouter API key
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error("[Search API] OPENROUTER_API_KEY is not configured")
      return Response.json(
        { error: "Search service is not configured" },
        { status: 503 }
      )
    }

    // Initialize OpenRouter provider
    const openrouter = createOpenRouter({
      apiKey: apiKey,
    })

    // Generate response using OpenRouter
    const { text, usage } = await generateText({
      model: openrouter("anthropic/claude-3.5-sonnet"),
      system: systemPrompt,
      prompt: query,
      maxTokens: 1000,
    })

    return Response.json({
      query,
      response: text,
      usage: {
        promptTokens: usage.promptTokens,
        completionTokens: usage.completionTokens,
        totalTokens: usage.totalTokens,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[Search API] Error:", error)

    // Handle specific error cases
    if (error.message?.includes("API key")) {
      return Response.json(
        { error: "Authentication failed. Please check API configuration." },
        { status: 401 }
      )
    }

    if (error.message?.includes("rate limit")) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      )
    }

    return Response.json(
      {
        error: "An error occurred while processing your search",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
