'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FhevmProvider as SdkFhevmProvider } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

interface FhevmProviderProps {
  children: ReactNode;
}

export function FhevmProvider({ children }: FhevmProviderProps) {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initProvider() {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const ethersProvider = new BrowserProvider(window.ethereum);
          setProvider(ethersProvider);
          setIsInitialized(true);
        } catch (error) {
          console.error('Failed to initialize provider:', error);
        }
      }
    }

    initProvider();
  }, []);

  if (!isInitialized || !provider) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Initializing FHEVM SDK...</p>
        </div>
      </div>
    );
  }

  const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111');

  return (
    <SdkFhevmProvider
      config={{
        provider,
        network: chainId,
        gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
        aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS,
      }}
    >
      {children}
    </SdkFhevmProvider>
  );
}
