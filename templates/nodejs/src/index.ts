import express from 'express';
import dotenv from 'dotenv';
import { FhevmClient } from '@fhevm/sdk';
import { JsonRpcProvider } from 'ethers';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize FHEVM client
let client: FhevmClient;

async function initializeClient() {
  const provider = new JsonRpcProvider(process.env.RPC_URL);
  client = new FhevmClient({
    provider,
    network: parseInt(process.env.CHAIN_ID || '11155111'),
  });
  await client.initialize();
  console.log('FHEVM client initialized');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Encryption endpoint
app.post('/api/encrypt', async (req, res) => {
  try {
    const { value, type } = req.body;

    if (!value || !type) {
      return res.status(400).json({ error: 'Missing value or type parameter' });
    }

    const encrypted = await client.encrypt(value, type);

    res.json({
      success: true,
      data: {
        encrypted,
        type,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Encryption error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
async function start() {
  try {
    await initializeClient();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
