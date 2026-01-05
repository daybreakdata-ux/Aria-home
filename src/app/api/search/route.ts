import { generateText } from "ai"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"

// Vercel Edge Runtime for faster cold starts and better scalability
export const runtime = "nodejs"
export const maxDuration = 30 // Maximum execution time in seconds

const systemPrompt = `You are Aria, an intelligent web search assistant.Conduct a fast, comprehensive web search for "SEARCH TERM" across major sites, forums, code and media platforms; return results in Google-style SERP format with titles, summaries, URLs, sources, dates; include code examples, images, and videos with thumbnails where relevant; prioritize recency, credibility, and usefulness; then summarize key insights by content type (guides, opinions, videos, code, etc.).

IMPORTANT GUIDELINES:
- **Primarily display information from the provided web search results**
- Present search results in a clean, easy-to-read format
- Include relevant links and sources from the search results
- Synthesize information from multiple search results when relevant
- Add your own knowledge only to provide context or clarify information
- For business queries, prioritize official websites, contact info, and reviews from search results
- Format responses like a modern search engine (Google, Bing style)
- Use bullet points, headings, and structured formatting
- Keep responses concise but comprehensive
- Always cite sources with [Title](URL) format`

interface SerperResult {
  title: string
  link: string
  snippet: string
  position: number
}

interface SerperResponse {
  organic?: SerperResult[]
  answerBox?: {
    title?: string
    answer?: string
    link?: string
  }
  knowledgeGraph?: {
    title?: string
    description?: string
    website?: string
  }
}

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

    // Check for API keys
    const openrouterKey = process.env.OPENROUTER_API_KEY
    const serperKey = process.env.SERPER_API_KEY

    if (!openrouterKey) {
      console.error("[Search API] OPENROUTER_API_KEY is not configured")
      return Response.json(
        { error: "Search service is not configured" },
        { status: 503 }
      )
    }

    if (!serperKey) {
      console.error("[Search API] SERPER_API_KEY is not configured")
      return Response.json(
        { error: "Web search service is not configured" },
        { status: 503 }
      )
    }

    // Perform web search using Serper API
    let searchResults = ""
    let rawSearchData = null
    
    try {
      const serperResponse = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": serperKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: query,
          num: 10, // Get top 10 results
        }),
      })

      if (!serperResponse.ok) {
        throw new Error(`Serper API error: ${serperResponse.status}`)
      }

      const data: SerperResponse = await serperResponse.json()
      rawSearchData = data

      // Format search results for the AI
      searchResults = "WEB SEARCH RESULTS:\n\n"

      // Add answer box if available
      if (data.answerBox) {
        searchResults += "FEATURED ANSWER:\n"
        if (data.answerBox.title) searchResults += `Title: ${data.answerBox.title}\n`
        if (data.answerBox.answer) searchResults += `${data.answerBox.answer}\n`
        if (data.answerBox.link) searchResults += `Source: ${data.answerBox.link}\n`
        searchResults += "\n"
      }

      // Add knowledge graph if available
      if (data.knowledgeGraph) {
        searchResults += "KNOWLEDGE PANEL:\n"
        if (data.knowledgeGraph.title) searchResults += `Title: ${data.knowledgeGraph.title}\n`
        if (data.knowledgeGraph.description) searchResults += `Description: ${data.knowledgeGraph.description}\n`
        if (data.knowledgeGraph.website) searchResults += `Website: ${data.knowledgeGraph.website}\n`
        searchResults += "\n"
      }

      // Add organic search results
      if (data.organic && data.organic.length > 0) {
        searchResults += "SEARCH RESULTS:\n\n"
        data.organic.forEach((result, index) => {
          searchResults += `${index + 1}. ${result.title}\n`
          searchResults += `   URL: ${result.link}\n`
          searchResults += `   ${result.snippet}\n\n`
        })
      }

      if (!searchResults || searchResults === "WEB SEARCH RESULTS:\n\n") {
        searchResults = "No search results found for this query."
      }
    } catch (searchError: any) {
      console.error("[Search API] Web search error:", searchError)
      searchResults = "Web search temporarily unavailable. Providing answer based on general knowledge."
    }

    // Initialize OpenRouter provider
    const openrouter = createOpenRouter({
      apiKey: openrouterKey,
    })

    // Generate response using OpenRouter with search results
    const enhancedPrompt = `User Query: ${query}

${searchResults}

Based on the above web search results, provide a comprehensive answer to the user's query. Prioritize information from the search results and include relevant links. Format your response clearly with proper structure.`

    const { text, usage } = await generateText({
      model: openrouter("google/gemma-3-27b-it:free"),
      system: systemPrompt,
      prompt: enhancedPrompt,
    })

    return Response.json(
      {
        query,
        response: text,
        searchResults: rawSearchData,
        usage: usage || undefined,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    )
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
