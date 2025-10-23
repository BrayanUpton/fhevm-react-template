'use client';

import { useState, useEffect } from 'react';
import { useFhevm } from '@fhevm/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function KeyManager() {
  const { client } = useFhevm();
  const [publicKey, setPublicKey] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkInitialization();
  }, [client]);

  const checkInitialization = async () => {
    if (client) {
      try {
        const initialized = await client.isInitialized();
        setIsInitialized(initialized);

        if (initialized) {
          // Get public key info
          setPublicKey('Public key loaded successfully');
        }
      } catch (error) {
        console.error('Failed to check initialization:', error);
      }
    }
  };

  const handleRefreshKeys = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await checkInitialization();
    } catch (error) {
      console.error('Failed to refresh keys:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card title="Key Management" description="Manage FHEVM encryption keys">
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Status: {isInitialized ? 'Initialized' : 'Initializing...'}
            </p>
          </div>
          {publicKey && (
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {publicKey}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Network Information
          </h4>
          <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Network:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {process.env.NEXT_PUBLIC_NETWORK_NAME || 'Sepolia'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Chain ID:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleRefreshKeys}
          isLoading={isRefreshing}
          variant="outline"
          className="w-full"
        >
          🔄 Refresh Keys
        </Button>

        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            About FHEVM Keys
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Public keys are used to encrypt data before sending to the blockchain</li>
            <li>• Private keys remain secure with the FHEVM network</li>
            <li>• Computations are performed on encrypted data without decryption</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
