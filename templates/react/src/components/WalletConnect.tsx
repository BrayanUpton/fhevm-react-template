import { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';

export function WalletConnect() {
  const [account, setAccount] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-lg text-sm">
          {account.slice(0, 6)}...{account.slice(-4)}
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Connect Wallet
    </button>
  );
}
