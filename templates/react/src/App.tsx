import { useState, useEffect } from 'react';
import { FhevmProvider } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';
import { EncryptionDemo } from './components/EncryptionDemo';
import { DecryptionDemo } from './components/DecryptionDemo';
import { WalletConnect } from './components/WalletConnect';

function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const ethersProvider = new BrowserProvider(window.ethereum);
      setProvider(ethersProvider);
    }
  }, []);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please install MetaMask
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This application requires a Web3 wallet to function.
          </p>
        </div>
      </div>
    );
  }

  const chainId = parseInt(import.meta.env.VITE_CHAIN_ID || '11155111');

  return (
    <FhevmProvider
      config={{
        provider,
        network: chainId,
        gatewayUrl: import.meta.env.VITE_GATEWAY_URL,
        aclAddress: import.meta.env.VITE_ACL_ADDRESS,
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  🔐 FHEVM React App
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Privacy-Preserving dApp with FHEVM SDK
                </p>
              </div>
              <WalletConnect />
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
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                🔒 Encryption
              </button>
              <button
                onClick={() => setActiveTab('decrypt')}
                className={`
                  ${activeTab === 'decrypt'
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                `}
              >
                🔓 Decryption
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'encrypt' ? <EncryptionDemo /> : <DecryptionDemo />}
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
                className="text-blue-600 hover:text-blue-500"
              >
                Zama's FHEVM
              </a>{' '}
              and <span className="font-semibold">@fhevm/sdk</span>
            </p>
          </div>
        </footer>
      </div>
    </FhevmProvider>
  );
}

export default App;
