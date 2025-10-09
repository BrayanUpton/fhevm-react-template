/**
 * @fhevm/sdk - Universal SDK for FHEVM (Fully Homomorphic Encryption Virtual Machine)
 *
 * This SDK provides a framework-agnostic interface for building confidential dApps
 * using Zama's FHEVM technology.
 *
 * @module @fhevm/sdk
 */

export { FhevmClient } from './client';
export { FhevmProvider, useFhevm } from './provider';
export {
  encryptInput,
  decryptData,
  publicDecrypt,
  userDecrypt
} from './encryption';
export {
  createFhevmInstance,
  getFhevmInstance
} from './instance';
export * from './types';
export * from './utils';

// React-specific exports
export { useFhevmEncrypt, useFhevmDecrypt, useFhevmContract } from './react/hooks';
