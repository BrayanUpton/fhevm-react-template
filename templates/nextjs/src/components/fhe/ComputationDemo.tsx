'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ComputationDemo() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    if (!value1 || !value2) return;

    setIsComputing(true);
    try {
      // Simulate computation
      await new Promise(resolve => setTimeout(resolve, 1000));

      const num1 = parseInt(value1);
      const num2 = parseInt(value2);
      let computedResult = 0;

      switch (operation) {
        case 'add':
          computedResult = num1 + num2;
          break;
        case 'subtract':
          computedResult = num1 - num2;
          break;
        case 'multiply':
          computedResult = num1 * num2;
          break;
      }

      setResult(`Result: ${computedResult} (encrypted on-chain)`);
    } catch (error) {
      console.error('Computation error:', error);
      setResult('Error: Computation failed');
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card
      title="Homomorphic Computation"
      description="Perform calculations on encrypted data"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (-)</option>
            <option value="multiply">Multiplication (×)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Value"
            type="number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first number"
          />
          <Input
            label="Second Value"
            type="number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <Button
          onClick={handleCompute}
          isLoading={isComputing}
          disabled={!value1 || !value2 || isComputing}
          className="w-full"
        >
          ⚙️ Compute
        </Button>

        {result && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">
              {result}
            </p>
            <p className="text-xs text-green-500 dark:text-green-500 mt-1">
              Note: In production, this computation happens on encrypted values
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
