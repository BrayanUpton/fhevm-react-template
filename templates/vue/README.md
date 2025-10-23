# Vue 3 FHEVM Template

A modern Vue 3 template with Vite and FHEVM SDK integration for building privacy-preserving decentralized applications.

## 🚀 Features

- ✅ **Vue 3** with Composition API
- ✅ **TypeScript** support
- ✅ **Vite** for fast development
- ✅ **FHEVM SDK** integration
- ✅ **Tailwind CSS** for styling
- ✅ **Vue 3 Composables** for FHEVM operations

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

3. **Run development server**
   ```bash
   npm run dev
   ```

## 💻 Usage

### Basic Integration

```typescript
import { ref } from 'vue';
import { FhevmClient } from '@fhevm/sdk';

export function useFhevmEncrypt(client: FhevmClient) {
  const isEncrypting = ref(false);
  const error = ref(null);

  const encrypt = async (value: number, type: string) => {
    isEncrypting.value = true;
    try {
      return await client.encrypt(value, type);
    } catch (e) {
      error.value = e;
    } finally {
      isEncrypting.value = false;
    }
  };

  return { encrypt, isEncrypting, error };
}
```

## 📚 Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Zama FHEVM](https://docs.zama.ai/fhevm)

## 🚢 Deployment

```bash
npm run build
```

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Built with FHEVM SDK** - Making confidential computing accessible to all developers
