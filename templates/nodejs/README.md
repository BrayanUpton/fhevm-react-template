# Node.js FHEVM Template

A Node.js template with FHEVM SDK for server-side encryption and decryption operations.

## 🚀 Features

- ✅ **Node.js** with TypeScript
- ✅ **Express.js** API server
- ✅ **FHEVM SDK** integration
- ✅ **Server-side encryption/decryption**
- ✅ **REST API endpoints**

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

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

### Basic Server Setup

```typescript
import express from 'express';
import { FhevmClient, encryptInput } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

const app = express();
app.use(express.json());

const provider = new JsonRpcProvider(process.env.RPC_URL);
const client = new FhevmClient({ provider, network: 11155111 });

app.post('/api/encrypt', async (req, res) => {
  const { value, type } = req.body;
  const encrypted = await client.encrypt(value, type);
  res.json({ encrypted });
});

app.listen(3000);
```

## 📚 API Endpoints

- `POST /api/encrypt` - Encrypt data
- `POST /api/decrypt` - Decrypt data
- `GET /api/keys` - Get public keys

## 📝 License

MIT License - see [LICENSE](../../LICENSE) for details.

---

**Built with FHEVM SDK** - Making confidential computing accessible to all developers
