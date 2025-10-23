# Next.js FHEVM Template

A modern Next.js 14 template with FHEVM SDK integration for building privacy-preserving decentralized applications.

## 🚀 Features

- ✅ **Next.js 14** with App Router
- ✅ **FHEVM SDK** integration for encrypted computations
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** for styling
- ✅ **React Hooks** for FHEVM operations
- ✅ **API Routes** for server-side operations

## 📦 Project Structure

```
src/
├── app/                        # App Router (Next.js 14)
│   ├── layout.tsx              # Root layout with FHEVM Provider
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── api/                    # API routes
│       ├── fhe/
│       │   ├── route.ts        # FHE operations route
│       │   ├── encrypt/route.ts # Encryption API
│       │   ├── decrypt/route.ts # Decryption API
│       │   └── compute/route.ts # Computation API
│       └── keys/route.ts       # Key management API
│
├── components/                 # React components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── fhe/                    # FHE feature components
│   │   ├── FHEProvider.tsx     # FHEVM context provider
│   │   ├── EncryptionDemo.tsx  # Encryption demo
│   │   ├── ComputationDemo.tsx # Computation demo
│   │   └── KeyManager.tsx      # Key management
│   └── examples/               # Use case examples
│       ├── BankingExample.tsx  # Banking use case
│       └── MedicalExample.tsx  # Medical records use case
│
├── lib/                        # Utility libraries
│   ├── fhe/                    # FHE integration
│   │   └── client.ts           # FHEVM client setup
│   └── utils/                  # Utility functions
│       ├── security.ts         # Security utilities
│       └── validation.ts       # Validation utilities
│
├── hooks/                      # Custom React hooks
│   └── useFHE.ts               # Combined FHE hook
│
└── types/                      # TypeScript types
    └── fhe.ts                  # FHE-related types
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MetaMask or compatible Web3 wallet

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_NETWORK_NAME=Sepolia
   NEXT_PUBLIC_GATEWAY_URL=https://gateway.sepolia.zama.ai
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💻 Usage

### Basic Encryption

```typescript
import { useFhevmEncrypt } from '@fhevm/sdk';

function MyComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(42, 'uint32');
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      Encrypt
    </button>
  );
}
```

### Using the FHE Provider

```typescript
import { FhevmProvider } from '@/components/fhe/FHEProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <FhevmProvider>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
```

### Custom Hook

```typescript
import { useFHE } from '@/hooks/useFHE';

function MyComponent() {
  const {
    client,
    isInitialized,
    encrypt,
    decrypt,
  } = useFHE();

  // Use encryption, decryption, and client
}
```

## 🔐 API Routes

### Encryption Endpoint

```bash
POST /api/fhe/encrypt
Content-Type: application/json

{
  "value": 42,
  "type": "uint32"
}
```

### Decryption Endpoint

```bash
POST /api/fhe/decrypt
Content-Type: application/json

{
  "ciphertext": "0x...",
  "signature": "0x...",
  "type": "user"
}
```

### Computation Endpoint

```bash
POST /api/fhe/compute
Content-Type: application/json

{
  "operation": "add",
  "operands": [encrypted1, encrypted2]
}
```

## 📚 Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please see the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Built with FHEVM SDK** - Making confidential computing accessible to all developers
