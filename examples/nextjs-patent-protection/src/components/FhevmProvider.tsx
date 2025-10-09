'use client';

import { ReactNode, useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { FhevmProvider } from '@fhevm/sdk';

export function FhevmContextProvider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    // Initialize provider when window.ethereum is available
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethProvider = new BrowserProvider(window.ethereum);
      setProvider(ethProvider);
    }
  }, []);

  if (!provider) {
    return <>{children}</>;
  }

  return (
    <FhevmProvider
      config={{
        provider,
        network: 11155111, // Sepolia testnet
        gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://gateway.zama.ai',
        aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS,
      }}
    >
      {children}
    </FhevmProvider>
  );
}
