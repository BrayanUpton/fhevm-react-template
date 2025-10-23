import { FhevmClient } from '@fhevm/sdk';
import { BrowserProvider } from 'ethers';

/**
 * Initialize FHEVM client with provider
 */
export async function initializeFhevmClient(provider: BrowserProvider, chainId: number) {
  const client = new FhevmClient({
    provider,
    network: chainId,
  });

  await client.initialize();
  return client;
}
