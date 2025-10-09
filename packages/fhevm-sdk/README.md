# @fhevm/sdk

> Universal SDK for building confidential dApps with FHEVM (Fully Homomorphic Encryption)

A framework-agnostic SDK that makes building privacy-preserving applications simple, consistent, and developer-friendly. Built on top of [Zama's FHEVM](https://docs.zama.ai/fhevm) technology.

## Features

- 🔐 **Fully Encrypted Operations** - Encrypt and decrypt data with ease
- 🎯 **Framework Agnostic** - Works with React, Next.js, Vue, Node.js, or any JavaScript environment
- 🪝 **Wagmi-Style Hooks** - Intuitive React hooks for web3 developers
- 📦 **Batteries Included** - All dependencies wrapped in one package
- 🚀 **Quick Setup** - Get started in less than 10 lines of code
- 🔄 **TypeScript First** - Full type safety and autocomplete
- 🎨 **Modular Architecture** - Use only what you need

## Installation

```bash
npm install @fhevm/sdk ethers fhevmjs
# or
yarn add @fhevm/sdk ethers fhevmjs
# or
pnpm add @fhevm/sdk ethers fhevmjs
```

## Quick Start

### Basic Usage (Vanilla JavaScript)

```javascript
import { FhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Initialize client
const provider = new BrowserProvider(window.ethereum);
const client = new FhevmClient({
  provider,
  network: 11155111, // Sepolia
  gatewayUrl: 'https://gateway.zama.ai'
});

await client.initialize();

// Encrypt data
const encrypted = await client.encrypt(42, 'uint32');

// Decrypt data (with user signature)
const decrypted = await client.decrypt({
  contractAddress: '0x...',
  handle: encrypted.handles[0],
  signer: await provider.getSigner()
});

console.log('Decrypted value:', decrypted);
```

### React Usage

```jsx
import { FhevmProvider, useFhevmEncrypt, useFhevmDecrypt } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Wrap your app with provider
function App() {
  const provider = new BrowserProvider(window.ethereum);

  return (
    <FhevmProvider config={{
      provider,
      network: 11155111,
      gatewayUrl: 'https://gateway.zama.ai'
    }}>
      <YourComponent />
    </FhevmProvider>
  );
}

// Use hooks in your components
function YourComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();
  const { decrypt, isDecrypting } = useFhevmDecrypt();

  const handleEncrypt = async () => {
    const result = await encrypt(42, 'uint32');
    console.log('Encrypted:', result);
  };

  const handleDecrypt = async (signer) => {
    const value = await decrypt({
      contractAddress: '0x...',
      handle: '0x...',
      signer
    });
    console.log('Decrypted:', value);
  };

  return (
    <div>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        Encrypt
      </button>
      <button onClick={() => handleDecrypt(signer)} disabled={isDecrypting}>
        Decrypt
      </button>
    </div>
  );
}
```

## API Reference

### Core Client

#### `FhevmClient`

Main client class for FHEVM operations.

```typescript
class FhevmClient {
  constructor(config: FhevmConfig);
  initialize(): Promise<void>;
  encrypt(value: number | bigint, type: EncryptedType): Promise<EncryptResult>;
  decrypt(params: DecryptParams): Promise<bigint>;
  publicDecrypt(params: PublicDecryptParams): Promise<bigint>;
  getInstance(): FhevmInstance;
  isInitialized(): boolean;
}
```

### Utility Functions

#### `encryptInput`

Simplified encryption function.

```typescript
async function encryptInput(
  instance: FhevmInstance,
  value: number | bigint,
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'
)
```

#### `userDecrypt`

User-authorized decryption with EIP-712 signature.

```typescript
async function userDecrypt(
  signer: Signer,
  contractAddress: string,
  handle: string,
  gatewayUrl: string
): Promise<bigint>
```

#### `publicDecrypt`

Public decryption without signature.

```typescript
async function publicDecrypt(
  contractAddress: string,
  handle: string,
  gatewayUrl: string
): Promise<bigint>
```

### React Hooks

#### `useFhevmEncrypt`

Hook for encrypting data.

```typescript
function useFhevmEncrypt(): {
  encrypt: (value: number | bigint, type: EncryptedType) => Promise<EncryptResult | null>;
  isEncrypting: boolean;
  error: Error | null;
}
```

#### `useFhevmDecrypt`

Hook for decrypting data.

```typescript
function useFhevmDecrypt(): {
  decrypt: (params: DecryptParams) => Promise<bigint | null>;
  publicDecrypt: (contractAddress: string, handle: string) => Promise<bigint | null>;
  isDecrypting: boolean;
  error: Error | null;
}
```

#### `useFhevmContract`

Hook for contract interactions.

```typescript
function useFhevmContract(): {
  call: (params: ContractCallParams) => Promise<any>;
  read: (params: Omit<ContractCallParams, 'signer'>) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}
```

#### `useFhevmEncryptedCall`

Combined hook for encrypting and calling contract.

```typescript
function useFhevmEncryptedCall(): {
  encryptAndCall: (
    value: number | bigint,
    type: EncryptedType,
    contractParams: ContractCallParams
  ) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}
```

## Encrypted Types

The SDK supports the following encrypted types:

- `uint8` / `euint8` - 8-bit unsigned integer
- `uint16` / `euint16` - 16-bit unsigned integer
- `uint32` / `euint32` - 32-bit unsigned integer
- `uint64` / `euint64` - 64-bit unsigned integer
- `uint128` / `euint128` - 128-bit unsigned integer
- `uint256` / `euint256` - 256-bit unsigned integer
- `ebool` - Encrypted boolean
- `eaddress` - Encrypted address

## Advanced Usage

### Custom Configuration

```javascript
const client = new FhevmClient({
  provider,
  network: 11155111,
  gatewayUrl: 'https://custom-gateway.com',
  aclAddress: '0x...' // Optional: Custom ACL contract address
});
```

### Instance Management

```javascript
import { createFhevmInstance, getFhevmInstance } from '@fhevm/sdk';

// Create and cache instance
const instance = await createFhevmInstance({
  chainId: 11155111,
  networkUrl: 'https://eth-sepolia.g.alchemy.com/v2/...',
  gatewayUrl: 'https://gateway.zama.ai'
});

// Retrieve cached instance
const cachedInstance = getFhevmInstance(11155111);
```

### Error Handling

```javascript
try {
  const encrypted = await client.encrypt(value, 'uint32');
} catch (error) {
  if (error.message.includes('not initialized')) {
    // Client not initialized
  } else if (error.message.includes('Encryption failed')) {
    // Encryption error
  }
}
```

### Retry Logic

```javascript
import { retry } from '@fhevm/sdk';

const result = await retry(
  () => client.decrypt(params),
  3, // max retries
  1000 // base delay in ms
);
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import type {
  FhevmConfig,
  FhevmClient,
  EncryptResult,
  DecryptParams,
  EncryptedType
} from '@fhevm/sdk';
```

## Examples

See the `/examples` directory for complete examples:

- **Next.js Patent Protection** - Full-stack patent application system
- **React Basic** - Simple React app with encryption
- **Vue Counter** - Counter app with encrypted state
- **Node.js Script** - Backend encryption/decryption

## Performance Tips

1. **Reuse Instances** - Create one instance per network and reuse it
2. **Cache Encrypted Values** - Encryption is expensive, cache when possible
3. **Batch Operations** - Combine multiple encryptions when possible
4. **Use Public Decrypt** - When user signature isn't needed

## Security Considerations

- ⚠️ Never expose private keys or sensitive data
- ✅ Always validate decrypted values
- ✅ Use user decryption (with signature) for sensitive operations
- ✅ Verify contract addresses before operations
- ✅ Implement rate limiting on gateway calls

## Testing

```bash
npm test
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md).

## License

MIT

## Resources

- [Zama FHEVM Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs Documentation](https://github.com/zama-ai/fhevmjs)
- [Example Applications](../../examples)
- [API Reference](./docs/API.md)

## Support

- [GitHub Issues](https://github.com/your-repo/issues)
- [Discord Community](https://discord.gg/zama)
- [Documentation](https://docs.zama.ai)

---

Made with ❤️ using [Zama's FHEVM](https://www.zama.ai/)
