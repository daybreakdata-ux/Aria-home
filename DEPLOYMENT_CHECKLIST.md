# Vercel Deployment Checklist

Use this checklist to ensure your Aria Home app is properly configured for Vercel deployment.

## Pre-Deployment Checklist

### ✅ Code Readiness
- [ ] All code changes committed to Git
- [ ] No console errors in local development
- [ ] Search functionality tested locally
- [ ] All features working as expected
- [ ] `.env.local` file exists (not committed to Git)

### ✅ Environment Variables
- [ ] OpenRouter API key obtained from [openrouter.ai/keys](https://openrouter.ai/keys)
- [ ] Serper API key obtained from [serper.dev](https://serper.dev/) - **REQUIRED**
- [ ] `.env.example` file exists in repository
- [ ] All required environment variables documented

### ✅ Repository Setup
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] `.gitignore` includes `.vercel` directory
- [ ] Repository is public or accessible to Vercel

## Vercel Setup Checklist

### ✅ Project Import
- [ ] Logged into [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Clicked "Add New..." → "Project"
- [ ] Selected the correct repository
- [ ] Vercel detected Next.js framework automatically

### ✅ Environment Variables Configuration
- [ ] Added `OPENROUTER_API_KEY` in Vercel project settings
- [ ] Added `SERPER_API_KEY` in Vercel project settings
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Verified variable names are spelled correctly
- [ ] No extra spaces in variable names or values

### ✅ Build Settings (Usually Auto-Detected)
- [ ] Framework: Next.js
- [ ] Build Command: `pnpm build` or `npm run build`
- [ ] Output Directory: `.next` (default)
- [ ] Install Command: `pnpm install` (if using pnpm)

## Post-Deployment Checklist

### ✅ Deployment Verification
- [ ] Build completed successfully
- [ ] No build errors in Vercel logs
- [ ] Deployment URL is accessible
- [ ] Home page loads correctly
- [ ] Dark mode works properly

### ✅ Feature Testing
- [ ] Search functionality works
  - [ ] Can submit search query
  - [ ] AI response displays correctly
  - [ ] Error handling works (try without API key)
- [ ] Weather widget displays data
- [ ] News feed loads (if implemented)
- [ ] Feature buttons are visible
- [ ] Navigation works properly

### ✅ API Testing
- [ ] `/api/search` endpoint responds
- [ ] No 503 "service not configured" errors
- [ ] No 401 authentication errors
- [ ] Response time is acceptable (< 30s)

### ✅ Mobile Testing
- [ ] App is responsive on mobile
- [ ] Touch interactions work
- [ ] PWA install prompt appears
- [ ] Can install as PWA on mobile

### ✅ Performance
- [ ] Check Vercel Analytics (if enabled)
- [ ] Page load time acceptable
- [ ] No console errors
- [ ] Images load properly

## Troubleshooting Common Issues

### "Search service is not configured"
**Problem**: `OPENROUTER_API_KEY` environment variable not set
**Solution**: 
1. Go to Vercel Project Settings → Environment Variables
2. Add `OPENROUTER_API_KEY` with your API key
3. Redeploy the project

### "Web search service is not configured"
**Problem**: `SERPER_API_KEY` environment variable not set
**Solution**: 
1. Go to Vercel Project Settings → Environment Variables
2. Add `SERPER_API_KEY` with your Serper API key
3. Redeploy the project

### "Web search is temporarily unavailable"
**Problem**: Serper API error or rate limit
**Solution**:
1. Check Serper API status and usage at [serper.dev/dashboard](https://serper.dev/dashboard)
2. Verify API key is valid
3. Check if you've exceeded your rate limit

### Build Fails
**Problem**: Dependencies or build errors
**Solution**:
1. Check Vercel build logs for specific errors
2. Verify `pnpm-lock.yaml` is committed
3. Try building locally: `pnpm build`
4. Fix any TypeScript errors

### API Route Returns 404
**Problem**: API routes not properly deployed
**Solution**:
1. Verify files are in `src/app/api/` directory
2. Check `vercel.json` configuration
3. Redeploy the project

### Slow API Response
**Problem**: OpenRouter API timeout or slow network
**Solution**:
1. Check OpenRouter status
2. Verify `maxDuration` is set to 30s
3. Monitor function execution time in Vercel

## Monitoring Setup (Optional)

### ✅ Vercel Analytics
- [ ] Enabled in Project Settings
- [ ] Web Vitals monitoring active

### ✅ Error Tracking
- [ ] Review function logs regularly
- [ ] Set up alerts for errors (if needed)

### ✅ Usage Monitoring
- [ ] Monitor OpenRouter usage/costs
- [ ] Check Vercel function execution limits
- [ ] Review bandwidth usage

## Security Checklist

- [ ] API keys stored in environment variables only
- [ ] `.env` files not committed to Git
- [ ] CORS headers configured (if needed)
- [ ] Rate limiting considered (if high traffic expected)

## Production Readiness

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Tested on multiple browsers
- [ ] Tested on multiple devices
- [ ] README updated with deployment URL
- [ ] Documentation complete

## Quick Commands

```bash
# Check environment variables
vercel env ls

# Add environment variables
vercel env add OPENROUTER_API_KEY
vercel env add SERPER_API_KEY

# View logs
vercel logs
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Project Issues](https://github.com/daybreakdata-ux/Aria-home/issues)

---

**Date Deployed**: _____________

**Deployment URL**: _____________

**Status**: ⬜ Development | ⬜ Preview | ⬜ Production

**Notes**: 
_____________________________________________
_____________________________________________
