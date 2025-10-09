/**
 * Core type definitions for FHEVM SDK
 */

import { BrowserProvider, Signer } from 'ethers';
import type { FhevmInstance } from 'fhevmjs';

/**
 * Configuration for initializing the FHEVM client
 */
export interface FhevmConfig {
  /** Ethereum provider (MetaMask, WalletConnect, etc.) */
  provider: BrowserProvider;
  /** Network ID */
  network: number;
  /** Gateway URL for ACL (Access Control List) */
  gatewayUrl?: string;
  /** Contract address for the FHE library */
  aclAddress?: string;
}

/**
 * Encrypted input data structure
 */
export interface EncryptedInput {
  /** Encrypted data handles */
  handles: string[];
  /** Input proof for verification */
  inputProof: string;
}

/**
 * Decryption request parameters
 */
export interface DecryptParams {
  /** Contract address */
  contractAddress: string;
  /** Encrypted data handle */
  handle: string;
  /** User's signer for EIP-712 signature */
  signer: Signer;
}

/**
 * Public decryption parameters (no signature required)
 */
export interface PublicDecryptParams {
  /** Contract address */
  contractAddress: string;
  /** Encrypted data handle */
  handle: string;
}

/**
 * Result of encryption operation
 */
export interface EncryptResult {
  /** Encrypted data */
  data: Uint8Array;
  /** Handles for the encrypted values */
  handles: string[];
  /** Input proof */
  proof: string;
}

/**
 * FHEVM client interface
 */
export interface IFhevmClient {
  /** Get the underlying FHEVM instance */
  getInstance(): FhevmInstance;
  /** Encrypt input data */
  encrypt(value: number | bigint, type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'): Promise<EncryptResult>;
  /** Decrypt data with user signature */
  decrypt(params: DecryptParams): Promise<bigint>;
  /** Public decryption (no signature) */
  publicDecrypt(params: PublicDecryptParams): Promise<bigint>;
  /** Check if client is initialized */
  isInitialized(): boolean;
}

/**
 * React context value for FHEVM provider
 */
export interface FhevmContextValue {
  /** FHEVM client instance */
  client: IFhevmClient | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
  /** Initialize the client */
  initialize: (config: FhevmConfig) => Promise<void>;
}

/**
 * Supported encrypted integer types
 */
export type EncryptedType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256' | 'ebool' | 'eaddress';

/**
 * Contract interaction parameters
 */
export interface ContractCallParams {
  /** Contract address */
  address: string;
  /** Contract ABI */
  abi: any[];
  /** Function name to call */
  functionName: string;
  /** Function arguments */
  args?: any[];
  /** Signer for transaction */
  signer: Signer;
}
