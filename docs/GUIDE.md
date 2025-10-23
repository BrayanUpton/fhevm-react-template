# FHEVM SDK Developer Guide

A comprehensive guide to building privacy-preserving applications with the FHEVM SDK.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
4. [Getting Started](#getting-started)
5. [React Integration](#react-integration)
6. [Advanced Usage](#advanced-usage)
7. [Best Practices](#best-practices)

## Introduction

The FHEVM SDK provides a simple, framework-agnostic interface for building confidential dApps using Fully Homomorphic Encryption (FHE). With FHE, you can perform computations on encrypted data without ever decrypting it.

## Installation

```bash
npm install @fhevm/sdk ethers fhevmjs
```

## Core Concepts

### What is FHE?

Fully Homomorphic Encryption allows computations on encrypted data. The results, when decrypted, match the results of operations performed on unencrypted data.

### Key Components

1. **FhevmClient** - Main SDK interface
2. **Instance Management** - Handles encryption key caching
3. **Encryption/Decryption** - Core FHE operations
4. **React Hooks** - Framework-specific helpers

## Getting Started

### Basic Setup

```typescript
import { FhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

// Initialize provider
const provider = new BrowserProvider(window.ethereum);

// Create client
const client = new FhevmClient({
  provider,
  network: 11155111, // Sepolia
});

// Initialize
await client.initialize();
```

### Encrypting Data

```typescript
// Encrypt a number
const encrypted = await client.encrypt(42, 'uint32');

// Use in contract call
const tx = await contract.submitEncryptedData(
  encrypted.data,
  encrypted.proof
);
```

### Decrypting Data

```typescript
// User decryption (requires signature)
const decrypted = await client.decrypt({
  ciphertext: '0x...',
  contractAddress: '0x...',
});

console.log('Decrypted value:', decrypted);
```

## React Integration

### Provider Setup

Wrap your app with the FHEVM provider:

```typescript
import { FhevmProvider } from '@fhevm/sdk';

function App() {
  return (
    <FhevmProvider config={{ provider, network: 11155111 }}>
      <YourApp />
    </FhevmProvider>
  );
}
```

### Using Hooks

```typescript
import { useFhevmEncrypt } from '@fhevm/sdk';

function MyComponent() {
  const { encrypt, isEncrypting, error } = useFhevmEncrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value, 'uint32');
    // Use encrypted data
  };

  return (
    <button onClick={() => handleSubmit(42)} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt'}
    </button>
  );
}
```

## Advanced Usage

### Custom Instance Management

```typescript
import { createFhevmInstance, getFhevmInstance } from '@fhevm/sdk';

// Create instance for specific network
const instance = await createFhevmInstance({ chainId: 11155111 });

// Reuse cached instance
const cached = getFhevmInstance(11155111);
```

### Contract Integration

```typescript
import { useFhevmContract } from '@fhevm/sdk';

function MyComponent() {
  const { contract, encryptAndCall } = useFhevmContract(
    contractAddress,
    contractABI
  );

  const submitData = async () => {
    await encryptAndCall('submitValue', 42, 'uint32');
  };
}
```

### Error Handling

```typescript
const { encrypt, error } = useFhevmEncrypt();

useEffect(() => {
  if (error) {
    console.error('Encryption error:', error);
    // Handle error
  }
}, [error]);
```

## Best Practices

### 1. Initialize Once

Create one client instance per application:

```typescript
// ✅ Good
const client = new FhevmClient(config);
await client.initialize();

// ❌ Bad - multiple initializations
function MyComponent() {
  const client = new FhevmClient(config); // Don't do this
}
```

### 2. Use Provider Pattern

For React apps, use the provider:

```typescript
// ✅ Good
<FhevmProvider config={config}>
  <App />
</FhevmProvider>

// ❌ Bad - manual client in every component
```

### 3. Handle Loading States

Always show loading indicators:

```typescript
const { encrypt, isEncrypting } = useFhevmEncrypt();

return (
  <button disabled={isEncrypting}>
    {isEncrypting ? 'Encrypting...' : 'Encrypt'}
  </button>
);
```

### 4. Validate Input Types

Ensure correct data types:

```typescript
// ✅ Good
const value = parseInt(userInput);
if (value >= 0 && value <= 255) {
  await encrypt(value, 'uint8');
}

// ❌ Bad - no validation
await encrypt(userInput, 'uint8');
```

### 5. Cache Instances

Use instance caching for better performance:

```typescript
import { getFhevmInstance } from '@fhevm/sdk';

const instance = getFhevmInstance(chainId) || await createFhevmInstance({ chainId });
```

## Common Patterns

### Form Handling

```typescript
function EncryptedForm() {
  const { encrypt } = useFhevmEncrypt();
  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const encrypted = await encrypt(parseInt(value), 'uint32');
    // Submit encrypted data to contract
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Decryption with EIP-712

```typescript
import { useFhevmDecrypt } from '@fhevm/sdk';

function DecryptButton({ ciphertext, contractAddress }) {
  const { decrypt, isDecrypting } = useFhevmDecrypt();

  const handleDecrypt = async () => {
    const value = await decrypt({
      ciphertext,
      contractAddress,
    });
    console.log('Decrypted:', value);
  };

  return (
    <button onClick={handleDecrypt} disabled={isDecrypting}>
      Decrypt
    </button>
  );
}
```

## Next Steps

- Explore [examples](../examples/)
- Read [API documentation](./API.md)
- Check [templates](../templates/)
- Review [best practices](../CONTRIBUTING.md)

## Support

- [GitHub Issues](https://github.com/BrayanUpton/fhevm-react-template/issues)
- [Zama Discord](https://discord.gg/zama)
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
