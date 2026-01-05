"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X } from "lucide-react"

interface SearchResultProps {
  result: {
    query: string
    response: string
    usage?: any
    timestamp?: string
    error?: string
  }
  onClose: () => void
}

export function SearchResult({ result, onClose }: SearchResultProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Handle error state
  if (result.error) {
    return (
      <Card className="p-4 animate-in fade-in slide-in-from-top-2 duration-300 border-destructive">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg text-destructive">Error</h3>
          <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-destructive">{result.error}</p>
      </Card>
    )
  }

  return (
    <Card className="p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">Answer</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="text-foreground leading-relaxed whitespace-pre-wrap">{result.response}</div>

        {isExpanded && result.usage && (
          <div className="pt-3 border-t border-border animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-sm font-medium mb-2">Usage Information:</p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Prompt Tokens: {result.usage.promptTokens || result.usage.prompt || "N/A"}</p>
              <p>Completion Tokens: {result.usage.completionTokens || result.usage.completion || "N/A"}</p>
              <p>Total Tokens: {result.usage.totalTokens || result.usage.total || "N/A"}</p>
            </div>
          </div>
        )}

        <Button variant="ghost" className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show Details <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
