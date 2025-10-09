/**
 * Encryption and decryption utilities
 * Simplified interface for common operations
 */

import type { Signer } from 'ethers';
import type { FhevmInstance } from 'fhevmjs';
import { generatePublicKey, createEIP712Signature } from './utils';

/**
 * Encrypt input value
 * @param instance - FHEVM instance
 * @param value - Value to encrypt
 * @param type - Type of encrypted integer
 */
export async function encryptInput(
  instance: FhevmInstance,
  value: number | bigint,
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' = 'uint32'
) {
  const input = instance.createEncryptedInput();

  switch (type) {
    case 'uint8':
      input.add8(Number(value));
      break;
    case 'uint16':
      input.add16(Number(value));
      break;
    case 'uint32':
      input.add32(Number(value));
      break;
    case 'uint64':
      input.add64(BigInt(value));
      break;
    case 'uint128':
      input.add128(BigInt(value));
      break;
    case 'uint256':
      input.add256(BigInt(value));
      break;
  }

  return input.encrypt();
}

/**
 * User-authorized decryption using EIP-712 signature
 * @param signer - User's signer
 * @param contractAddress - Contract address
 * @param handle - Encrypted data handle
 * @param gatewayUrl - Gateway URL
 */
export async function userDecrypt(
  signer: Signer,
  contractAddress: string,
  handle: string,
  gatewayUrl: string
): Promise<bigint> {
  try {
    const publicKey = await generatePublicKey(signer);
    const signature = await createEIP712Signature(signer, contractAddress, handle, publicKey);

    const response = await fetch(`${gatewayUrl}/decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contractAddress,
        handle,
        signature,
        publicKey
      })
    });

    if (!response.ok) {
      throw new Error(`Decryption failed: ${response.statusText}`);
    }

    const result = await response.json();
    return BigInt(result.value);
  } catch (error) {
    throw new Error(`User decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Public decryption (no signature required)
 * @param contractAddress - Contract address
 * @param handle - Encrypted data handle
 * @param gatewayUrl - Gateway URL
 */
export async function publicDecrypt(
  contractAddress: string,
  handle: string,
  gatewayUrl: string
): Promise<bigint> {
  try {
    const response = await fetch(`${gatewayUrl}/public-decrypt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contractAddress,
        handle
      })
    });

    if (!response.ok) {
      throw new Error(`Public decryption failed: ${response.statusText}`);
    }

    const result = await response.json();
    return BigInt(result.value);
  } catch (error) {
    throw new Error(`Public decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generic decrypt function that chooses between user and public decryption
 */
export async function decryptData(
  contractAddress: string,
  handle: string,
  gatewayUrl: string,
  signer?: Signer
): Promise<bigint> {
  if (signer) {
    return userDecrypt(signer, contractAddress, handle, gatewayUrl);
  } else {
    return publicDecrypt(contractAddress, handle, gatewayUrl);
  }
}
