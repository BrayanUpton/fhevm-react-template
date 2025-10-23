# React FHEVM Template

A modern React template with Vite and FHEVM SDK integration for building privacy-preserving decentralized applications.

## 🚀 Features

- ✅ **React 18** with TypeScript
- ✅ **Vite** for fast development
- ✅ **FHEVM SDK** integration
- ✅ **Tailwind CSS** for styling
- ✅ **React Hooks** for FHEVM operations
- ✅ **Hot Module Replacement** (HMR)

## 📦 Project Structure

```
src/
├── components/           # React components
│   ├── EncryptionDemo.tsx   # Encryption demo
│   ├── DecryptionDemo.tsx   # Decryption demo
│   └── WalletConnect.tsx    # Wallet connection
├── hooks/               # Custom hooks
├── types/               # TypeScript types
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
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
   cp .env.example .env
   ```

   Update `.env` with your configuration:
   ```env
   VITE_CHAIN_ID=11155111
   VITE_NETWORK_NAME=Sepolia
   VITE_GATEWAY_URL=https://gateway.sepolia.zama.ai
   VITE_CONTRACT_ADDRESS=0x...
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to the URL shown in the terminal (usually http://localhost:5173)

## 💻 Usage

### Basic Integration

```typescript
import { FhevmProvider, useFhevmEncrypt } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

function App() {
  const provider = new BrowserProvider(window.ethereum);

  return (
    <FhevmProvider config={{ provider, network: 11155111 }}>
      <YourComponent />
    </FhevmProvider>
  );
}

function YourComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'uint32');
    console.log('Encrypted:', result);
  };

  return (
    <button onClick={handleEncrypt} disabled={isEncrypting}>
      Encrypt
    </button>
  );
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📚 Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Deploy to Vercel

```bash
npm run build
vercel deploy
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

Contributions are welcome! Please see the main project [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Built with FHEVM SDK** - Making confidential computing accessible to all developers
