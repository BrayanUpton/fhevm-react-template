# 🚀 Deployment Guide

Complete guide for deploying the FHEVM SDK examples to production.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Deploy Next.js Example](#deploy-nextjs-example)
- [Environment Configuration](#environment-configuration)
- [Deployment Platforms](#deployment-platforms)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Project built successfully (`npm run build`)
- [ ] All tests passing (`npm test`)
- [ ] Environment variables configured
- [ ] Smart contract deployed to Sepolia
- [ ] Domain name (optional)

## 🌐 Deploy Next.js Example

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

#### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

#### Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to Example**
   ```bash
   cd examples/nextjs-patent-protection
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_GATEWAY_URL
   vercel env add NEXT_PUBLIC_CONTRACT_ADDRESS
   vercel env add NEXT_PUBLIC_RPC_URL
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

#### Vercel Dashboard Setup

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Set root directory to `examples/nextjs-patent-protection`
5. Add environment variables (see below)
6. Click "Deploy"

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build Project**
   ```bash
   cd examples/nextjs-patent-protection
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Set Environment Variables**
   Go to Netlify dashboard → Site settings → Environment variables

### Option 3: Custom VPS

For custom servers (DigitalOcean, AWS EC2, etc.):

1. **Setup Server**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-repo/fhevm-sdk.git
   cd fhevm-sdk
   npm install
   ```

3. **Build Project**
   ```bash
   cd examples/nextjs-patent-protection
   npm run build
   ```

4. **Start with PM2**
   ```bash
   pm2 start npm --name "fhevm-example" -- start
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔐 Environment Configuration

### Required Environment Variables

```env
# FHEVM Configuration
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_ACL_ADDRESS=0x... # Optional

# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract

# Network Configuration
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=Sepolia
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

### Optional Environment Variables

```env
# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Error Tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=https://...

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add NEXT_PUBLIC_GATEWAY_URL production
# Enter value when prompted
```

#### Netlify
```bash
netlify env:set NEXT_PUBLIC_GATEWAY_URL "https://gateway.zama.ai"
```

#### Local .env.local
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

## 📦 Deployment Platforms

### Vercel
- ✅ Best for Next.js
- ✅ Automatic deployments from GitHub
- ✅ Edge network (CDN)
- ✅ Free SSL certificates
- ✅ Preview deployments for PRs

### Netlify
- ✅ Good Next.js support
- ✅ Automatic deployments
- ✅ Form handling
- ✅ Split testing
- ✅ Free tier available

### AWS Amplify
- ✅ AWS integration
- ✅ CI/CD pipeline
- ✅ Custom domain support
- ✅ Environment variable management

### Railway
- ✅ Simple deployment
- ✅ Database integration
- ✅ Automatic HTTPS
- ✅ Pay-as-you-go pricing

### Render
- ✅ Free tier
- ✅ Automatic deployments
- ✅ Custom domains
- ✅ PostgreSQL support

## 🔗 Smart Contract Deployment

Before deploying the frontend, deploy your smart contract:

### 1. Configure Hardhat

```javascript
// hardhat.config.js
module.exports = {
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

### 2. Deploy Contract

```bash
# From parent project directory
cd D:\
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Verify Contract

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS
```

### 4. Update Environment

Copy the deployed contract address to your frontend `.env`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

## ✅ Post-Deployment

### 1. Test Deployment

```bash
# Test basic functionality
curl https://your-deployment-url.vercel.app

# Test API endpoints
curl https://your-deployment-url.vercel.app/api/health
```

### 2. Verify Features

- [ ] Connect wallet works
- [ ] Encrypt data works
- [ ] Decrypt data works
- [ ] Contract interaction works
- [ ] MetaMask popups appear correctly
- [ ] All pages load properly

### 3. Setup Monitoring

#### Vercel Analytics
```typescript
// Add to layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Google Analytics
```typescript
// Add to layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4. Setup Domain (Optional)

#### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### 5. Enable HTTPS

Most platforms provide automatic HTTPS via Let's Encrypt. If not:

1. Obtain SSL certificate from [Let's Encrypt](https://letsencrypt.org/)
2. Configure in your platform settings
3. Force HTTPS redirect:
   ```javascript
   // next.config.js
   module.exports = {
     async redirects() {
       return [
         {
           source: '/:path*',
           has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
           destination: 'https://your-domain.com/:path*',
           permanent: true
         }
       ];
     }
   };
   ```

## 🔧 Troubleshooting

### Build Failures

**Problem**: Build fails with TypeScript errors

**Solution**:
```bash
# Type check locally first
npm run type-check

# Fix type errors, then rebuild
npm run build
```

**Problem**: Module not found errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Problem**: "window is not defined"

**Solution**:
```typescript
// Use dynamic import with ssr: false
import dynamic from 'next/dynamic';

const WalletConnect = dynamic(
  () => import('./WalletConnect'),
  { ssr: false }
);
```

**Problem**: MetaMask not detected

**Solution**:
```typescript
if (typeof window !== 'undefined' && window.ethereum) {
  // Use window.ethereum
}
```

### Environment Variables Not Working

**Problem**: Environment variables are undefined

**Solution**:
1. Ensure variables start with `NEXT_PUBLIC_`
2. Restart development server after adding variables
3. For production, set variables in platform dashboard
4. Verify variables are set:
   ```bash
   vercel env ls
   ```

### Contract Interaction Failures

**Problem**: Transactions fail with "Contract not deployed"

**Solution**:
1. Verify contract address in .env
2. Check you're on correct network (Sepolia)
3. Verify contract is deployed:
   ```bash
   npx hardhat verify --network sepolia YOUR_ADDRESS
   ```

**Problem**: "FHEVM client not initialized"

**Solution**:
```typescript
// Ensure initialization before use
const { client, isLoading } = useFhevm();

if (isLoading) return <Loading />;
if (!client) return <Error />;

// Now safe to use client
```

## 📊 Performance Optimization

### 1. Enable Compression

```javascript
// next.config.js
module.exports = {
  compress: true,
};
```

### 2. Optimize Images

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={50}
  priority // For above-the-fold images
/>
```

### 3. Bundle Analysis

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // your config
});

# Run analysis
ANALYZE=true npm run build
```

### 4. Enable CDN Caching

```javascript
// next.config.js
module.exports = {
  headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

## 📝 Deployment Checklist

Before going live:

- [ ] All tests passing
- [ ] TypeScript type check passes
- [ ] Lint check passes
- [ ] Smart contract deployed and verified
- [ ] Environment variables configured
- [ ] Domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Analytics setup
- [ ] Error tracking configured
- [ ] README updated with deployment URL
- [ ] Demo video updated with live URL
- [ ] Security audit completed
- [ ] Performance optimized
- [ ] Backup strategy in place

## 🎉 Success!

Your FHEVM SDK example is now live!

Update your README with the deployment URL:

```markdown
## 🌐 Live Demo

https://your-deployment-url.vercel.app
```

---

**Questions?** Check [CONTRIBUTING.md](./CONTRIBUTING.md) or open an issue on GitHub.
