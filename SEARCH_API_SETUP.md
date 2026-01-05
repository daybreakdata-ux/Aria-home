# Search API Setup

The search functionality uses OpenRouter API to provide AI-powered responses to user queries.

## Setup Instructions

1. **Get an OpenRouter API Key**
   - Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
   - Sign up or log in
   - Create a new API key

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_actual_api_key_here
     ```

3. **Restart the Development Server**
   ```bash
   pnpm dev
   ```

## API Details

### Endpoint
- **URL**: `/api/search`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Format
```json
{
  "query": "your search query here"
}
```

### Response Format
```json
{
  "query": "your search query",
  "response": "AI-generated response",
  "usage": {
    "promptTokens": 100,
    "completionTokens": 200,
    "totalTokens": 300
  },
  "timestamp": "2026-01-05T12:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

## Model Configuration

The API uses **Claude 3.5 Sonnet** from Anthropic via OpenRouter:
- Model: `anthropic/claude-3.5-sonnet`
- Max Tokens: 1000
- System prompt customized for the Aria assistant persona

## System Prompt

The search API uses a specialized system prompt that instructs the AI to:
- Act as "Aria", an intelligent home screen assistant
- Provide accurate and concise information
- Be conversational yet professional
- Format responses in a user-friendly way
- Use bullet points and structured formatting when appropriate

## Error Handling

The API handles various error scenarios:
- **400 Bad Request**: Invalid or empty query
- **401 Unauthorized**: API key authentication failed
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: General server errors
- **503 Service Unavailable**: Missing API key configuration

## Features

- ✅ AI-powered search responses
- ✅ Token usage tracking
- ✅ Comprehensive error handling
- ✅ System prompt for consistent assistant behavior
- ✅ Environment variable configuration
- ✅ Development and production error messages
