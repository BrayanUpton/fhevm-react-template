'use client';

import { useFhevm, useFhevmEncrypt, useFhevmDecrypt } from '@fhevm/sdk';

/**
 * Custom hook that combines FHEVM SDK hooks
 * Provides easy access to encryption, decryption, and client
 */
export function useFHE() {
  const { client, isInitialized } = useFhevm();
  const { encrypt, isEncrypting, error: encryptError } = useFhevmEncrypt();
  const { decrypt, isDecrypting, error: decryptError } = useFhevmDecrypt();

  return {
    client,
    isInitialized,
    encrypt,
    isEncrypting,
    encryptError,
    decrypt,
    isDecrypting,
    decryptError,
  };
}
