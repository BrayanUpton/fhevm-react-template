/**
 * React hooks for FHEVM operations
 * Wagmi-style hooks for encryption, decryption, and contract interaction
 */

import { useState, useCallback } from 'react';
import { Contract, Signer } from 'ethers';
import { useFhevm } from '../provider';
import type { EncryptResult, DecryptParams, ContractCallParams } from '../types';

/**
 * Hook for encrypting data
 */
export function useFhevmEncrypt() {
  const { client } = useFhevm();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (
      value: number | bigint,
      type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' = 'uint32'
    ): Promise<EncryptResult | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const result = await client.encrypt(value, type);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        return null;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client]
  );

  return {
    encrypt,
    isEncrypting,
    error
  };
}

/**
 * Hook for decrypting data
 */
export function useFhevmDecrypt() {
  const { client } = useFhevm();
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (params: DecryptParams): Promise<bigint | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await client.decrypt(params);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Decryption failed');
        setError(error);
        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client]
  );

  const publicDecrypt = useCallback(
    async (contractAddress: string, handle: string): Promise<bigint | null> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await client.publicDecrypt({ contractAddress, handle });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Public decryption failed');
        setError(error);
        return null;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client]
  );

  return {
    decrypt,
    publicDecrypt,
    isDecrypting,
    error
  };
}

/**
 * Hook for interacting with contracts
 */
export function useFhevmContract() {
  const { client } = useFhevm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const call = useCallback(
    async (params: ContractCallParams): Promise<any> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const contract = new Contract(params.address, params.abi, params.signer);
        const result = await contract[params.functionName](...(params.args || []));
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Contract call failed');
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  const read = useCallback(
    async (params: Omit<ContractCallParams, 'signer'>): Promise<any> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const provider = await params.signer?.provider;
        if (!provider) {
          throw new Error('Provider not available');
        }

        const contract = new Contract(params.address, params.abi, provider);
        const result = await contract[params.functionName](...(params.args || []));
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Contract read failed');
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client]
  );

  return {
    call,
    read,
    isLoading,
    error
  };
}

/**
 * Hook for encrypting and sending to contract in one operation
 */
export function useFhevmEncryptedCall() {
  const { client } = useFhevm();
  const { encrypt } = useFhevmEncrypt();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptAndCall = useCallback(
    async (
      value: number | bigint,
      type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256',
      contractParams: ContractCallParams
    ): Promise<any> => {
      if (!client) {
        setError(new Error('FHEVM client not initialized'));
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Encrypt the value
        const encrypted = await encrypt(value, type);
        if (!encrypted) {
          throw new Error('Encryption failed');
        }

        // Call contract with encrypted data
        const contract = new Contract(
          contractParams.address,
          contractParams.abi,
          contractParams.signer
        );

        const result = await contract[contractParams.functionName](
          encrypted.handles[0],
          encrypted.proof,
          ...(contractParams.args || [])
        );

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encrypted call failed');
        setError(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [client, encrypt]
  );

  return {
    encryptAndCall,
    isLoading,
    error
  };
}
