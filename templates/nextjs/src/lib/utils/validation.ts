/**
 * Validation utility functions for form inputs and data
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Field validation rule
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: any) => string | null;
}

/**
 * Validate a single field against rules
 */
export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string = 'Field'
): ValidationResult {
  const errors: string[] = [];

  // Required check
  if (rules.required && (value === null || value === undefined || value === '')) {
    errors.push(`${fieldName} is required`);
    return { valid: false, errors };
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return { valid: true, errors: [] };
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${fieldName} must be at most ${rules.maxLength} characters`);
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${fieldName} format is invalid`);
    }
  }

  // Number validations
  if (typeof value === 'number') {
    if (rules.min !== undefined && value < rules.min) {
      errors.push(`${fieldName} must be at least ${rules.min}`);
    }

    if (rules.max !== undefined && value > rules.max) {
      errors.push(`${fieldName} must be at most ${rules.max}`);
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validate multiple fields
 */
export function validateFields(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const allErrors: string[] = [];

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const { errors } = validateField(data[fieldName], fieldRules, fieldName);
    allErrors.push(...errors);
  }

  return {
    valid: allErrors.length === 0,
    errors: allErrors
  };
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Phone number validation (basic international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}

/**
 * Numeric string validation
 */
export function isNumericString(str: string): boolean {
  return /^\d+$/.test(str);
}

/**
 * Alphanumeric validation
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * Hex string validation
 */
export function isHexString(str: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(str);
}

/**
 * Date validation
 */
export function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Future date validation
 */
export function isFutureDate(dateStr: string): boolean {
  if (!isValidDate(dateStr)) return false;
  const date = new Date(dateStr);
  return date > new Date();
}

/**
 * Password strength validation
 */
export interface PasswordStrength {
  valid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
}

export function validatePasswordStrength(
  password: string,
  minLength: number = 8
): PasswordStrength {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase) errors.push('Password must contain uppercase letters');
  if (!hasLowerCase) errors.push('Password must contain lowercase letters');
  if (!hasNumbers) errors.push('Password must contain numbers');
  if (!hasSpecialChar) errors.push('Password must contain special characters');

  // Calculate strength
  const criteriaMet = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
  if (criteriaMet >= 4 && password.length >= 12) {
    strength = 'strong';
  } else if (criteriaMet >= 3 && password.length >= minLength) {
    strength = 'medium';
  }

  return {
    valid: errors.length === 0,
    strength,
    errors
  };
}

/**
 * File size validation (in bytes)
 */
export function isValidFileSize(size: number, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size <= maxSizeBytes;
}

/**
 * File type validation
 */
export function isValidFileType(filename: string, allowedTypes: string[]): boolean {
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
}

/**
 * Range validation
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Array validation
 */
export function isNonEmptyArray<T>(arr: T[]): arr is [T, ...T[]] {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * Object validation
 */
export function hasRequiredKeys<T extends Record<string, any>>(
  obj: T,
  requiredKeys: string[]
): boolean {
  return requiredKeys.every(key => key in obj);
}

/**
 * Credit card validation (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
}

/**
 * Validate JSON string
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
