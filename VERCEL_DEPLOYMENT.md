# Vercel Deployment Guide

This guide walks you through deploying the Aria Home application to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. An [OpenRouter API key](https://openrouter.ai/keys)
3. Your repository pushed to GitHub, GitLab, or Bitbucket

## Deployment Steps

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your `Aria-home` repository
4. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

Before deploying, add the required environment variables:

1. In the Vercel project setup, scroll to **"Environment Variables"**
2. Add the following variables:
   
   **OPENROUTER_API_KEY**
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key from [openrouter.ai/keys](https://openrouter.ai/keys)
   - **Environment**: Select all (Production, Preview, Development)
   
   **SERPER_API_KEY** (Required)
   - **Name**: `SERPER_API_KEY`
   - **Value**: Your Serper API key from [serper.dev](https://serper.dev/)
   - **Environment**: Select all (Production, Preview, Development)

3. Click **"Deploy"**

### 3. Alternative: Add Environment Variables After Deployment

If you already deployed, you can add environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `OPENROUTER_API_KEY` with your API key
4. Select which environments to apply it to
5. Redeploy your project

### 4. Verify Deployment

After deployment completes:

1. Visit your Vercel URL (e.g., `your-app.vercel.app`)
2. Test the search functionality
3. Open browser DevTools → Console to check for any errors

## Vercel Configuration

### Runtime Settings

The search API is configured with:
- **Runtime**: Node.js (for OpenRouter SDK compatibility)
- **Max Duration**: 30 seconds (for API response time)
- **Region**: Auto (Vercel's edge network)

### Environment Variables

Required variables:
- `OPENROUTER_API_KEY` - Your OpenRouter API key (get from [openrouter.ai/keys](https://openrouter.ai/keys))
- `SERPER_API_KEY` - Your Serper API key (get from [serper.dev](https://serper.dev/)) - **REQUIRED** for search functionality
- `NODE_ENV` - Automatically set by Vercel (production/preview/development)

### API Routes

The following API routes are available:
- `/api/search` - POST endpoint for AI-powered search
- `/api/weather` - GET endpoint for weather data

## Using Vercel CLI (Optional)

### Install Vercel CLI

```bash
npm i -g vercel
```

### Deploy from Command Line

```bash
# First deployment
vercel

# Production deployment
vercel --prod
```

### Set Environment Variables via CLI

```bash
vercel env add OPENROUTER_API_KEY
vercel env add SERPER_API_KEY
```

## Continuous Deployment

Vercel automatically sets up continuous deployment:

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests and other branches
- **Development**: Use `vercel dev` for local development with Vercel environment

### Branch Configuration

1. Go to **Settings** → **Git**
2. Set your production branch (usually `main`)
3. Configure preview deployments for branches/PRs

## Performance Optimization

### Caching Strategy

The API is configured with:
```javascript
headers: {
  'Cache-Control': 'no-cache, no-store, must-revalidate'
}
```

This ensures fresh AI responses for each search query.

### Edge Network

Vercel automatically deploys your app to their global edge network for:
- Low latency worldwide
- Automatic HTTPS
- DDoS protection
- Automatic scaling

## Monitoring

### View Logs

1. Go to your project in Vercel Dashboard
2. Click **"Deployments"**
3. Select a deployment
4. Click **"Functions"** to see API logs

### Analytics

Vercel provides built-in analytics:
- Page views
- API route performance
- Error tracking
- Web Vitals

Access at: **Your Project** → **Analytics**

## Troubleshooting

### Search API Not Working

1. **Check environment variables**:
   - Verify `OPENROUTER_API_KEY` is set correctly
   - Make sure it's enabled for the right environment

2. **Check function logs**:
   - Go to Deployment → Functions → `/api/search`
   - Look for error messages

3. **Verify API key**:
   - Test your OpenRouter key at [OpenRouter Playground](https://openrouter.ai/playground)

### Common Issues

**"Search service is not configured"**
- Environment variable not set or misspelled
- Solution: Add `OPENROUTER_API_KEY` in Vercel project settings

**"Web search service is not configured"**
- Serper API key not set
- Solution: Add `SERPER_API_KEY` in Vercel project settings

**"Web search is temporarily unavailable"**
- Serper API is down or rate limited
- Invalid Serper API key
- Solution: Check your Serper dashboard at [serper.dev/dashboard](https://serper.dev/dashboard)

**"Authentication failed"**
- Invalid or expired API key
- Solution: Generate a new key from OpenRouter

**"Rate limit exceeded"**
- Too many requests to OpenRouter
- Solution: Implement request throttling or upgrade your plan

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Vercel automatically provisions SSL certificates

## Environment-Specific Configuration

### Production
- Full error logging
- Monitoring enabled
- Production API keys

### Preview
- Same as production but for testing
- Useful for reviewing PRs before merge

### Development
- Local development with `vercel dev`
- Uses local environment variables from `.env.local`

## Security Best Practices

1. ✅ Never commit `.env` or `.env.local` files
2. ✅ Use Vercel's environment variables feature
3. ✅ Rotate API keys regularly
4. ✅ Enable Vercel's security headers
5. ✅ Monitor function usage and costs

## Cost Considerations

- Vercel Hobby plan includes:
  - 100GB bandwidth
  - 100GB-hours serverless function execution
  - Unlimited API requests

- OpenRouter charges per token:
  - Monitor usage in OpenRouter dashboard
  - Set usage limits if needed

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenRouter Documentation](https://openrouter.ai/docs)
