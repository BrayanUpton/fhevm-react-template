'use client';

import { useState } from 'react';
import { useFhevmEncrypt, useFhevmDecrypt } from '@fhevm/sdk';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

/**
 * Banking Example Component
 * Demonstrates confidential balance management using FHE
 */
export function BankingExample() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();
  const { decrypt, isDecrypting } = useFhevmDecrypt();

  const [balance, setBalance] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<any>(null);
  const [decryptedBalance, setDecryptedBalance] = useState<string>('');

  const handleEncryptBalance = async () => {
    if (!balance) return;

    try {
      const numBalance = parseInt(balance);
      const result = await encrypt(numBalance, 'uint32');

      if (result) {
        setEncryptedBalance(result);
      }
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  const handleEncryptDeposit = async () => {
    if (!depositAmount) return;

    try {
      const numDeposit = parseInt(depositAmount);
      const result = await encrypt(numDeposit, 'uint32');

      console.log('Encrypted deposit:', result);
      // In a real application, you would send this to a smart contract
    } catch (err) {
      console.error('Encryption error:', err);
    }
  };

  return (
    <Card
      title="Banking Use Case"
      description="Confidential balance management with encrypted transactions"
    >
      <div className="space-y-6">
        {/* Encrypt Balance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Step 1: Encrypt Initial Balance
          </h3>

          <Input
            label="Account Balance"
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="Enter initial balance"
            helperText="This balance will be encrypted and stored securely"
          />

          <Button
            onClick={handleEncryptBalance}
            isLoading={isEncrypting}
            disabled={!balance || isEncrypting}
            className="w-full"
          >
            🔒 Encrypt Balance
          </Button>

          {encryptedBalance && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                ✓ Balance encrypted successfully! In production, this would be stored on-chain.
              </p>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Encrypted Deposit */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Step 2: Make Encrypted Deposit
          </h3>

          <Input
            label="Deposit Amount"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Enter deposit amount"
            helperText="The deposit will be encrypted and added to your balance"
          />

          <Button
            onClick={handleEncryptDeposit}
            isLoading={isEncrypting}
            disabled={!depositAmount || isEncrypting || !encryptedBalance}
            className="w-full"
          >
            💰 Encrypt & Deposit
          </Button>
        </div>

        {/* Use Case Description */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Why This Matters
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Account balances remain completely private on-chain</li>
            <li>• Transactions can be computed without revealing amounts</li>
            <li>• Compliant with privacy regulations while maintaining auditability</li>
            <li>• No trusted third party needed to manage sensitive data</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
