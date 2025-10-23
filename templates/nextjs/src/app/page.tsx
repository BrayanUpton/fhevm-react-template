'use client';

import { useState } from 'react';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'compute' | 'keys'>('encrypt');

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              🔐 FHEVM SDK Demo
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Privacy-Preserving Smart Contracts with Fully Homomorphic Encryption
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab('encrypt')}
              className={`
                ${activeTab === 'encrypt'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              `}
            >
              🔒 Encryption
            </button>
            <button
              onClick={() => setActiveTab('compute')}
              className={`
                ${activeTab === 'compute'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              `}
            >
              ⚙️ Computation
            </button>
            <button
              onClick={() => setActiveTab('keys')}
              className={`
                ${activeTab === 'keys'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              `}
            >
              🔑 Keys
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'encrypt' && <EncryptionDemo />}
        {activeTab === 'compute' && <ComputationDemo />}
        {activeTab === 'keys' && <KeyManager />}
      </div>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with{' '}
            <a
              href="https://www.zama.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-500"
            >
              Zama's FHEVM
            </a>{' '}
            and{' '}
            <span className="font-semibold">@fhevm/sdk</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
