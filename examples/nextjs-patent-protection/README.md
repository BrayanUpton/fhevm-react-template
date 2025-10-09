# Patent Protection System - Next.js Example

> Privacy-preserving patent application system built with FHEVM SDK and Next.js

This example demonstrates how to integrate the `@fhevm/sdk` into a Next.js application to build a fully confidential patent protection system where all sensitive data remains encrypted on-chain.

## Features

- 🔐 **Fully Encrypted Data** - Patent titles, descriptions, and claims stored encrypted
- 👨‍⚖️ **Role-Based Access** - Separate interfaces for applicants and examiners
- 🪝 **FHEVM SDK Integration** - Uses wagmi-style hooks for encryption/decryption
- 🎨 **Modern UI** - Built with Tailwind CSS and responsive design
- ⚡ **Fast Performance** - Next.js 14 with App Router

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **SDK**: @fhevm/sdk
- **Styling**: Tailwind CSS
- **Blockchain**: Ethereum (Sepolia Testnet)
- **Encryption**: Zama's FHEVM

## Prerequisites

- Node.js 18+
- MetaMask or compatible Web3 wallet
- Some Sepolia ETH for gas fees

## Quick Start

### 1. Install Dependencies

```bash
# From monorepo root
npm install

# Or from this directory
cd examples/nextjs-patent-protection
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXT_PUBLIC_GATEWAY_URL=https://gateway.zama.ai
NEXT_PUBLIC_CONTRACT_ADDRESS=0x... # Your deployed contract
NEXT_PUBLIC_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
nextjs-patent-protection/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with FHEVM provider
│   │   ├── page.tsx             # Main application page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── FhevmProvider.tsx    # FHEVM context provider
│   │   ├── ConnectWallet.tsx    # Wallet connection component
│   │   ├── PatentApplicationForm.tsx  # Application submission form
│   │   ├── ApplicationsList.tsx # List of user's applications
│   │   └── ExaminerPanel.tsx    # Examiner dashboard
│   └── lib/
│       └── contract.ts          # Contract interaction utilities
├── contracts/
│   └── PrivateIPProtection.sol  # Smart contract
├── next.config.js
├── tailwind.config.js
└── package.json
```

## SDK Usage Examples

### Encrypting Data

```tsx
import { useFhevmEncrypt } from '@fhevm/sdk';

function MyComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      Encrypt Data
    </button>
  );
}
```

### Decrypting Data

```tsx
import { useFhevmDecrypt } from '@fhevm/sdk';

function MyComponent() {
  const { decrypt, isDecrypting } = useFhevmDecrypt();

  const handleDecrypt = async (signer) => {
    const value = await decrypt({
      contractAddress: '0x...',
      handle: '0x...',
      signer
    });
    console.log('Decrypted:', value);
  };

  return (
    <button onClick={() => handleDecrypt(signer)} disabled={isDecrypting}>
      Decrypt Data
    </button>
  );
}
```

### Contract Interaction

```tsx
import { useFhevmContract } from '@fhevm/sdk';

function MyComponent() {
  const { call, isLoading } = useFhevmContract();

  const submitApplication = async () => {
    const result = await call({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitApplication',
      args: [encryptedData],
      signer
    });
  };

  return (
    <button onClick={submitApplication} disabled={isLoading}>
      Submit Application
    </button>
  );
}
```

## Features Demonstrated

### 1. Application Submission
- Encrypt patent data (title, description, claims)
- Submit to blockchain with encrypted values
- Pay application fee
- Track submission status

### 2. Examiner Dashboard
- View assigned applications
- Review encrypted data (authorized access)
- Submit review decisions
- Track review history

### 3. Privacy Controls
- All sensitive data encrypted on-chain
- Access control via FHEVM
- EIP-712 signatures for decryption
- Audit trail of data access

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

## Testing

```bash
# Type check
npm run type-check

# Lint
npm run lint
```

## Common Issues

### MetaMask Not Detected

Make sure MetaMask is installed and you're on the Sepolia network.

### Transaction Failing

1. Check you have enough Sepolia ETH
2. Verify contract address is correct
3. Ensure FHEVM is initialized before transactions

### Encryption Errors

1. Wait for FHEVM client to initialize
2. Check gateway URL is correct
3. Verify network configuration

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Zama FHEVM Docs](https://docs.zama.ai/fhevm)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

---

Built with ❤️ using [Zama's FHEVM](https://www.zama.ai/) and [@fhevm/sdk](../../packages/fhevm-sdk)
