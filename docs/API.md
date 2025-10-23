# FHEVM SDK API Reference

Complete API documentation for the FHEVM SDK.

## Core Classes

### FhevmClient

The main client class for interacting with FHEVM.

```typescript
class FhevmClient {
  constructor(config: FhevmConfig);
  initialize(): Promise<void>;
  encrypt(value: number, type: EncryptedType): Promise<EncryptedData>;
  decrypt(params: DecryptionRequest): Promise<bigint>;
  isInitialized(): Promise<boolean>;
}
```

#### Methods

##### `initialize()`

Initializes the FHEVM client and loads encryption keys.

```typescript
await client.initialize();
```

##### `encrypt(value, type)`

Encrypts a value using FHE.

- `value`: Number to encrypt
- `type`: Data type (`'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'`)

```typescript
const encrypted = await client.encrypt(42, 'uint32');
```

##### `decrypt(params)`

Decrypts an encrypted value.

```typescript
const decrypted = await client.decrypt({
  ciphertext: '0x...',
  contractAddress: '0x...',
});
```

## React Hooks

### useFhevm

Access the FHEVM client instance.

```typescript
function useFhevm(): {
  client: FhevmClient;
  isInitialized: boolean;
}
```

### useFhevmEncrypt

Hook for encrypting data.

```typescript
function useFhevmEncrypt(): {
  encrypt: (value: number, type: EncryptedType) => Promise<EncryptedData>;
  isEncrypting: boolean;
  error: Error | null;
}
```

### useFhevmDecrypt

Hook for decrypting data.

```typescript
function useFhevmDecrypt(): {
  decrypt: (params: DecryptionRequest) => Promise<bigint>;
  isDecrypting: boolean;
  error: Error | null;
}
```

### useFhevmContract

Hook for interacting with FHE contracts.

```typescript
function useFhevmContract(address: string, abi: any): {
  contract: Contract;
  encryptAndCall: (method: string, ...args: any[]) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}
```

## Utility Functions

### encryptInput

Encrypts input data.

```typescript
function encryptInput(
  instance: FhevmInstance,
  value: number,
  type: EncryptedType
): Promise<EncryptedData>
```

### userDecrypt

Decrypts data with user signature.

```typescript
function userDecrypt(
  instance: FhevmInstance,
  ciphertext: string,
  contractAddress: string,
  signer: Signer
): Promise<bigint>
```

### publicDecrypt

Decrypts publicly accessible data.

```typescript
function publicDecrypt(
  instance: FhevmInstance,
  ciphertext: string
): Promise<bigint>
```

## Types

### FhevmConfig

```typescript
interface FhevmConfig {
  provider: BrowserProvider | JsonRpcProvider;
  network: number;
  gatewayUrl?: string;
  aclAddress?: string;
}
```

### EncryptedData

```typescript
interface EncryptedData {
  data: Uint8Array;
  handles: string[];
  proof: string;
}
```

### DecryptionRequest

```typescript
interface DecryptionRequest {
  ciphertext: string;
  signature?: string;
  contractAddress: string;
}
```

### EncryptedType

```typescript
type EncryptedType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256';
```

## Error Handling

All SDK methods may throw errors. Always use try-catch blocks:

```typescript
try {
  const encrypted = await client.encrypt(42, 'uint32');
} catch (error) {
  console.error('Encryption failed:', error);
}
```

## Best Practices

1. **Initialize once** - Create one client instance per application
2. **Cache instances** - Use the instance caching utilities
3. **Handle errors** - Always wrap SDK calls in try-catch
4. **Type safety** - Use TypeScript for full type checking
5. **Network configuration** - Ensure correct network and gateway URLs

## Examples

See the [examples](../examples/) directory for complete working examples.
