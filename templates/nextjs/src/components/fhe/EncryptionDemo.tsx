'use client';

import { useState } from 'react';
import { useFhevmEncrypt } from '@fhevm/sdk';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export function EncryptionDemo() {
  const { encrypt, isEncrypting, error } = useFhevmEncrypt();
  const [value, setValue] = useState('');
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'uint8' | 'uint16' | 'uint32' | 'uint64'>('uint32');

  const handleEncrypt = async () => {
    if (!value) return;

    try {
      const numValue = parseInt(value);
      const result = await encrypt(numValue, selectedType);

      if (result) {
        setEncryptedData(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  return (
    <Card title="Encryption Demo" description="Encrypt data using FHEVM SDK">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Data Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="uint8">uint8 (0-255)</option>
            <option value="uint16">uint16 (0-65535)</option>
            <option value="uint32">uint32 (0-4294967295)</option>
            <option value="uint64">uint64 (larger numbers)</option>
          </select>
        </div>

        <Input
          label="Value to Encrypt"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number"
          helperText="Enter a positive integer to encrypt"
        />

        <Button
          onClick={handleEncrypt}
          isLoading={isEncrypting}
          disabled={!value || isEncrypting}
          className="w-full"
        >
          🔒 Encrypt
        </Button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              Error: {error.message}
            </p>
          </div>
        )}

        {encryptedData && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Encrypted Result
            </label>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-xs">
              {encryptedData}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}
