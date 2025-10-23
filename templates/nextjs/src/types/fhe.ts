/**
 * FHEVM type definitions
 */

export type EncryptedType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256';

export interface EncryptedData {
  data: Uint8Array;
  handles: string[];
  proof: string;
}

export interface DecryptionRequest {
  ciphertext: string;
  signature?: string;
  contractAddress: string;
}

export interface FhevmConfig {
  chainId: number;
  gatewayUrl?: string;
  aclAddress?: string;
}
