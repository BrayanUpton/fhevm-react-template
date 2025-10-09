/**
 * Utility functions for FHEVM operations
 */

import { Signer, TypedDataDomain, TypedDataField } from 'ethers';

/**
 * Generate a public key for encryption
 * @param signer - Ethereum signer
 */
export async function generatePublicKey(signer: Signer): Promise<string> {
  const address = await signer.getAddress();
  const message = `Generate public key for ${address}`;
  const signature = await signer.signMessage(message);
  return signature;
}

/**
 * Create EIP-712 signature for decryption
 * @param signer - Ethereum signer
 * @param contractAddress - Contract address
 * @param handle - Encrypted data handle
 * @param publicKey - User's public key
 */
export async function createEIP712Signature(
  signer: Signer,
  contractAddress: string,
  handle: string,
  publicKey: string
): Promise<string> {
  const domain: TypedDataDomain = {
    name: 'Authorization',
    version: '1',
    chainId: await signer.provider?.getNetwork().then(n => Number(n.chainId)),
    verifyingContract: contractAddress
  };

  const types: Record<string, TypedDataField[]> = {
    Reencrypt: [
      { name: 'publicKey', type: 'bytes' },
      { name: 'handle', type: 'uint256' }
    ]
  };

  const value = {
    publicKey,
    handle
  };

  return await signer.signTypedData(domain, types, value);
}

/**
 * Convert BigInt to hex string
 */
export function bigIntToHex(value: bigint): string {
  return '0x' + value.toString(16);
}

/**
 * Convert hex string to BigInt
 */
export function hexToBigInt(hex: string): bigint {
  return BigInt(hex);
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format encrypted handle for display
 */
export function formatHandle(handle: string): string {
  if (handle.length <= 10) return handle;
  return `${handle.slice(0, 6)}...${handle.slice(-4)}`;
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      if (i < maxRetries - 1) {
        await sleep(baseDelay * Math.pow(2, i));
      }
    }
  }

  throw lastError!;
}
