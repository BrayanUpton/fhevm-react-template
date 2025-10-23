import { useState } from 'react';
import { useFhevmDecrypt } from '@fhevm/sdk';

export function DecryptionDemo() {
  const { decrypt, isDecrypting, error } = useFhevmDecrypt();
  const [ciphertext, setCiphertext] = useState('');
  const [decryptedValue, setDecryptedValue] = useState('');

  const handleDecrypt = async () => {
    if (!ciphertext) return;

    try {
      const result = await decrypt({
        ciphertext,
        contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '0x...',
      });

      if (result) {
        setDecryptedValue(result.toString());
      }
    } catch (err) {
      console.error('Decryption error:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Decrypt Data
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ciphertext
          </label>
          <input
            type="text"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter ciphertext (0x...)"
          />
        </div>

        <button
          onClick={handleDecrypt}
          disabled={!ciphertext || isDecrypting}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDecrypting ? 'Decrypting...' : '🔓 Decrypt'}
        </button>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              Error: {error.message}
            </p>
          </div>
        )}

        {decryptedValue && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-900 dark:text-green-100 font-medium">
              Decrypted Value: {decryptedValue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
