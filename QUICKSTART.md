# ⚡ Quick Start Guide

Get started with FHEVM SDK in less than 5 minutes!

## 🚀 Super Quick Start

### 1. Clone & Install (30 seconds)

```bash
git clone https://github.com/your-repo/fhevm-sdk.git
cd fhevm-sdk
npm install
```

### 2. Run Example (30 seconds)

```bash
npm run dev:nextjs
```

Open http://localhost:3000 🎉

## 📦 Use in Your Project

### Install

```bash
npm install @fhevm/sdk ethers fhevmjs
```

### Use (5 lines!)

```typescript
import { FhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

const provider = new BrowserProvider(window.ethereum);
const client = new FhevmClient({ provider, network: 11155111 });
await client.initialize();

// Encrypt
const encrypted = await client.encrypt(42, 'uint32');

// Decrypt
const decrypted = await client.decrypt({
  contractAddress: '0x...',
  handle: encrypted.handles[0],
  signer: await provider.getSigner()
});
```

## ⚛️ React Hooks

```jsx
import { FhevmProvider, useFhevmEncrypt } from '@fhevm/sdk';

// 1. Wrap app with provider
function App() {
  return (
    <FhevmProvider config={{ provider, network: 11155111 }}>
      <YourComponent />
    </FhevmProvider>
  );
}

// 2. Use hooks
function YourComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();

  const handleClick = async () => {
    const result = await encrypt(42, 'uint32');
    console.log('Encrypted:', result);
  };

  return (
    <button onClick={handleClick} disabled={isEncrypting}>
      Encrypt
    </button>
  );
}
```

## 📚 Learn More

- **[Full README](./README.md)** - Complete documentation
- **[SDK API](./packages/fhevm-sdk/README.md)** - All functions and hooks
- **[Example App](./examples/nextjs-patent-protection/README.md)** - Real-world example
- **[Video Demo](./demo.mp4)** - Watch 3-min walkthrough

## 🆘 Need Help?

- 📖 [Documentation](./README.md)
- 🐛 [Report Issues](https://github.com/your-repo/issues)
- 💬 [Discord Community](https://discord.gg/zama)

## 🎯 Next Steps

1. ✅ Got it running? Great!
2. 📖 Read the [SDK README](./packages/fhevm-sdk/README.md)
3. 🔍 Explore the [example code](./examples/nextjs-patent-protection)
4. 🛠️ Build your own confidential dApp!

---

**That's it!** You're ready to build with FHEVM 🚀
