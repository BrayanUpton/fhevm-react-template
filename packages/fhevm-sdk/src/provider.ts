/**
 * React provider for FHEVM context
 * Enables React applications to use FHEVM with hooks
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FhevmClient } from './client';
import type { FhevmConfig, FhevmContextValue } from './types';

// Create context
const FhevmContext = createContext<FhevmContextValue | null>(null);

/**
 * Provider component for FHEVM
 */
export function FhevmProvider({
  children,
  config
}: {
  children: React.ReactNode;
  config?: FhevmConfig;
}) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async (initConfig: FhevmConfig) => {
    setIsLoading(true);
    setError(null);

    try {
      const newClient = new FhevmClient(initConfig);
      await newClient.initialize();
      setClient(newClient);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM');
      setError(error);
      console.error('FHEVM initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-initialize if config is provided
  useEffect(() => {
    if (config && !client) {
      initialize(config);
    }
  }, [config, client, initialize]);

  const value: FhevmContextValue = {
    client,
    isLoading,
    error,
    initialize
  };

  return React.createElement(FhevmContext.Provider, { value }, children);
}

/**
 * Hook to access FHEVM context
 */
export function useFhevm(): FhevmContextValue {
  const context = useContext(FhevmContext);

  if (!context) {
    throw new Error('useFhevm must be used within a FhevmProvider');
  }

  return context;
}
