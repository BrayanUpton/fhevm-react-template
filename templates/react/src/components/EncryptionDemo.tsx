import { useState } from 'react';
import { useFhevmEncrypt } from '@fhevm/sdk';

export function EncryptionDemo() {
  const { encrypt, isEncrypting, error } = useFhevmEncrypt();
  const [value, setValue] = useState('');
  const [encryptedData, setEncryptedData] = useState('');

  const handleEncrypt = async () => {
    if (!value) return;

    try {
      const result = await encrypt(parseInt(value), 'uint32');
      if (result) {
        setEncryptedData(JSON.stringify(result, null, 2));
      }
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Encrypt Data
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Value to Encrypt
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter a number"
          />
        </div>

        <button
          onClick={handleEncrypt}
          disabled={!value || isEncrypting}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEncrypting ? 'Encrypting...' : '🔒 Encrypt'}
        </button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              Error: {error.message}
            </p>
          </div>
        )}

        {encryptedData && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Encrypted Result
            </label>
            <pre className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-x-auto text-xs">
              {encryptedData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
