/**
 * FHEVM Client - Core client for interacting with FHEVM
 */

import { createInstance, FhevmInstance } from 'fhevmjs';
import { BrowserProvider, Signer } from 'ethers';
import type {
  FhevmConfig,
  IFhevmClient,
  EncryptResult,
  DecryptParams,
  PublicDecryptParams
} from './types';
import { generatePublicKey, createEIP712Signature } from './utils';

/**
 * Main FHEVM client class
 * Provides methods for encryption, decryption, and FHEVM operations
 */
export class FhevmClient implements IFhevmClient {
  private instance: FhevmInstance | null = null;
  private provider: BrowserProvider;
  private network: number;
  private gatewayUrl?: string;
  private aclAddress?: string;
  private initialized = false;

  constructor(config: FhevmConfig) {
    this.provider = config.provider;
    this.network = config.network;
    this.gatewayUrl = config.gatewayUrl;
    this.aclAddress = config.aclAddress;
  }

  /**
   * Initialize the FHEVM instance
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Create FHEVM instance with network configuration
      this.instance = await createInstance({
        chainId: this.network,
        networkUrl: this.provider._getConnection().url,
        gatewayUrl: this.gatewayUrl,
        aclAddress: this.aclAddress
      });

      this.initialized = true;
    } catch (error) {
      throw new Error(`Failed to initialize FHEVM: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the FHEVM instance
   */
  getInstance(): FhevmInstance {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  /**
   * Check if client is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Encrypt input data
   * @param value - Value to encrypt
   * @param type - Encrypted type (uint8, uint16, uint32, etc.)
   */
  async encrypt(
    value: number | bigint,
    type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256'
  ): Promise<EncryptResult> {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized');
    }

    try {
      const input = this.instance.createEncryptedInput();

      // Add the value to encrypted input based on type
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
        default:
          throw new Error(`Unsupported type: ${type}`);
      }

      const encrypted = input.encrypt();

      return {
        data: encrypted.data,
        handles: encrypted.handles || [],
        proof: encrypted.inputProof
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decrypt data using user signature (EIP-712)
   * @param params - Decryption parameters
   */
  async decrypt(params: DecryptParams): Promise<bigint> {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized');
    }

    const { contractAddress, handle, signer } = params;

    try {
      // Generate public key for the user
      const publicKey = await generatePublicKey(signer);

      // Create EIP-712 signature
      const signature = await createEIP712Signature(
        signer,
        contractAddress,
        handle,
        publicKey
      );

      // Request decryption from gateway
      const response = await fetch(`${this.gatewayUrl}/decrypt`, {
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
        throw new Error(`Decryption request failed: ${response.statusText}`);
      }

      const result = await response.json();
      return BigInt(result.value);
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Public decryption (no signature required)
   * @param params - Public decryption parameters
   */
  async publicDecrypt(params: PublicDecryptParams): Promise<bigint> {
    if (!this.instance) {
      throw new Error('FHEVM client not initialized');
    }

    const { contractAddress, handle } = params;

    try {
      // Request public decryption from gateway
      const response = await fetch(`${this.gatewayUrl}/public-decrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress,
          handle
        })
      });

      if (!response.ok) {
        throw new Error(`Public decryption request failed: ${response.statusText}`);
      }

      const result = await response.json();
      return BigInt(result.value);
    } catch (error) {
      throw new Error(`Public decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
