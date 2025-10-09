/**
 * FHEVM instance management
 * Singleton pattern for managing FHEVM instances
 */

import { createInstance, FhevmInstance } from 'fhevmjs';

// Global instance cache
const instanceCache = new Map<number, FhevmInstance>();

/**
 * Configuration for creating FHEVM instance
 */
export interface InstanceConfig {
  chainId: number;
  networkUrl?: string;
  gatewayUrl?: string;
  aclAddress?: string;
}

/**
 * Create or retrieve a cached FHEVM instance
 * @param config - Instance configuration
 */
export async function createFhevmInstance(config: InstanceConfig): Promise<FhevmInstance> {
  // Check cache first
  if (instanceCache.has(config.chainId)) {
    const cached = instanceCache.get(config.chainId);
    if (cached) {
      return cached;
    }
  }

  // Create new instance
  const instance = await createInstance({
    chainId: config.chainId,
    networkUrl: config.networkUrl,
    gatewayUrl: config.gatewayUrl,
    aclAddress: config.aclAddress
  });

  // Cache it
  instanceCache.set(config.chainId, instance);

  return instance;
}

/**
 * Get cached FHEVM instance
 * @param chainId - Network chain ID
 */
export function getFhevmInstance(chainId: number): FhevmInstance | null {
  return instanceCache.get(chainId) || null;
}

/**
 * Clear instance cache
 * @param chainId - Optional chain ID to clear specific instance
 */
export function clearInstanceCache(chainId?: number): void {
  if (chainId !== undefined) {
    instanceCache.delete(chainId);
  } else {
    instanceCache.clear();
  }
}
