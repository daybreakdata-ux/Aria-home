"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, X } from "lucide-react"

interface SearchResultProps {
  result: {
    summary: string
    details: string
    sources?: string[]
  }
  onClose: () => void
}

export function SearchResult({ result, onClose }: SearchResultProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg">Answer</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-foreground leading-relaxed">{result.summary}</p>

        {isExpanded && (
          <div className="pt-3 border-t border-border animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-muted-foreground leading-relaxed">{result.details}</p>

            {result.sources && result.sources.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Sources:</p>
                <ul className="space-y-1">
                  {result.sources.map((source, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground">
                      • {source}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <Button variant="ghost" className="w-full" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
