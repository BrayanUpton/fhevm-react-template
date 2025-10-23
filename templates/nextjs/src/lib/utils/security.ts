/**
 * Security utility functions for FHEVM applications
 */

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate encrypted data handle format
 */
export function isValidHandle(handle: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(handle);
}

/**
 * Check if value is within uint bounds
 */
export function isWithinUintBounds(value: number, bits: number): boolean {
  if (value < 0) return false;
  const maxValue = Math.pow(2, bits) - 1;
  return value <= maxValue;
}

/**
 * Validate uint8 value (0-255)
 */
export function isValidUint8(value: number): boolean {
  return isWithinUintBounds(value, 8);
}

/**
 * Validate uint16 value (0-65535)
 */
export function isValidUint16(value: number): boolean {
  return isWithinUintBounds(value, 16);
}

/**
 * Validate uint32 value (0-4294967295)
 */
export function isValidUint32(value: number): boolean {
  return isWithinUintBounds(value, 32);
}

/**
 * Validate uint64 value
 */
export function isValidUint64(value: bigint): boolean {
  const maxValue = BigInt(2) ** BigInt(64) - BigInt(1);
  return value >= BigInt(0) && value <= maxValue;
}

/**
 * Rate limiting helper (simple in-memory implementation)
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Secure random number generator
 */
export function generateSecureRandom(min: number, max: number): number {
  const range = max - min;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
}

/**
 * Hash string for on-chain storage (simple implementation)
 */
export function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

/**
 * Verify data integrity with checksum
 */
export function calculateChecksum(data: Uint8Array): string {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum = (sum + data[i]) & 0xFFFF;
  }
  return sum.toString(16).padStart(4, '0');
}

/**
 * Safe JSON parsing with error handling
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Secure session token generator
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate transaction parameters
 */
export interface TransactionParams {
  to: string;
  value?: bigint;
  data?: string;
  gasLimit?: bigint;
}

export function validateTransactionParams(params: TransactionParams): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!isValidAddress(params.to)) {
    errors.push('Invalid recipient address');
  }

  if (params.value !== undefined && params.value < BigInt(0)) {
    errors.push('Value must be non-negative');
  }

  if (params.data && !params.data.startsWith('0x')) {
    errors.push('Data must be hex string starting with 0x');
  }

  if (params.gasLimit !== undefined && params.gasLimit < BigInt(21000)) {
    errors.push('Gas limit too low');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
