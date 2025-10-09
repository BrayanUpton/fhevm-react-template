# Contributing to FHEVM SDK

First off, thank you for considering contributing to the FHEVM SDK! This project aims to make confidential computing accessible to all developers, and your contributions help achieve that goal.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- A code editor (VS Code recommended)
- Basic knowledge of TypeScript and React

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/your-username/fhevm-sdk.git
   cd fhevm-sdk
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the SDK**
   ```bash
   npm run build:sdk
   ```

4. **Run Tests**
   ```bash
   npm run test:sdk
   ```

5. **Start Example**
   ```bash
   npm run dev:nextjs
   ```

## 🤝 How to Contribute

### Ways to Contribute

- 🐛 **Report Bugs** - Found a bug? Let us know!
- ✨ **Suggest Features** - Have an idea? We'd love to hear it!
- 📝 **Improve Documentation** - Help others understand the SDK
- 🧪 **Add Tests** - More tests = more reliable code
- 💻 **Submit Code** - Fix bugs or implement features
- 🎨 **Add Examples** - Show how to use the SDK in different ways

### Good First Issues

Look for issues labeled `good first issue` or `help wanted` on GitHub. These are great starting points!

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write clean, readable code
- Follow the coding guidelines below
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run tests
npm run test:sdk
npm run test:all

# Type check
cd packages/fhevm-sdk && npm run type-check

# Lint
npm run lint

# Format
npm run format
```

### 4. Commit Your Changes

We use conventional commits format:

```bash
git add .
git commit -m "feat: add new encryption method"
# or
git commit -m "fix: resolve decryption issue"
# or
git commit -m "docs: update README with examples"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📏 Coding Guidelines

### TypeScript

```typescript
// ✅ Good: Clear types, descriptive names
interface EncryptionParams {
  value: number | bigint;
  type: EncryptedType;
}

async function encryptValue(params: EncryptionParams): Promise<EncryptResult> {
  // Implementation
}

// ❌ Bad: Unclear types, vague names
function doStuff(x: any): any {
  // Implementation
}
```

### React Hooks

```typescript
// ✅ Good: Follows React hooks rules
export function useFhevmEncrypt() {
  const { client } = useFhevm();
  const [isEncrypting, setIsEncrypting] = useState(false);

  const encrypt = useCallback(async (value, type) => {
    // Implementation
  }, [client]);

  return { encrypt, isEncrypting };
}

// ❌ Bad: Conditional hooks
export function useFhevmEncrypt() {
  if (condition) {
    const [state, setState] = useState(); // ❌ Conditional hook
  }
}
```

### Error Handling

```typescript
// ✅ Good: Descriptive error messages
if (!client) {
  throw new Error('FHEVM client not initialized. Call initialize() first.');
}

// ❌ Bad: Vague error messages
if (!client) {
  throw new Error('Error');
}
```

### Documentation

```typescript
/**
 * Encrypt input data for FHEVM
 *
 * @param value - The value to encrypt (number or bigint)
 * @param type - The encrypted type (uint8, uint16, uint32, etc.)
 * @returns Promise resolving to encrypted result with handles and proof
 * @throws {Error} If encryption fails or client is not initialized
 *
 * @example
 * ```typescript
 * const encrypted = await client.encrypt(42, 'uint32');
 * console.log('Handles:', encrypted.handles);
 * ```
 */
async function encrypt(value: number | bigint, type: EncryptedType): Promise<EncryptResult> {
  // Implementation
}
```

### File Organization

```
packages/fhevm-sdk/src/
├── index.ts          # Main exports
├── client.ts         # Core client class
├── encryption.ts     # Encryption utilities
├── types.ts          # TypeScript types
├── utils.ts          # Utility functions
└── react/
    ├── hooks.ts      # React hooks
    └── provider.ts   # React provider
```

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
Describe the tests you ran and how to reproduce

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

### Review Process

1. **Automated Checks** - CI runs tests, linting, type checking
2. **Code Review** - Maintainer reviews code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, PR will be merged

## 🐛 Reporting Bugs

### Before Reporting

- Check if the bug has already been reported
- Verify it's a bug and not a feature request
- Test with the latest version

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## To Reproduce
Steps to reproduce:
1. Initialize client with...
2. Call function...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- SDK Version: x.x.x
- Framework: React/Next.js/Vue
- Node Version: x.x.x
- Browser: Chrome/Firefox/Safari

## Additional Context
Any other relevant information
```

## ✨ Suggesting Enhancements

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature

## Use Case
Why is this feature needed?

## Proposed Solution
How could this be implemented?

## Alternatives Considered
Other ways to solve this problem

## Additional Context
Any other relevant information
```

## 📚 Documentation Contributions

### Documentation Guidelines

- Use clear, simple language
- Include code examples
- Keep examples up to date
- Add TypeScript types to examples
- Explain the "why" not just the "what"

### Example Documentation

````markdown
## Encrypting Data

The SDK provides multiple ways to encrypt data depending on your use case.

### Basic Encryption

```typescript
import { FhevmClient } from '@fhevm/sdk';

const client = new FhevmClient({ provider, network: 11155111 });
await client.initialize();

const encrypted = await client.encrypt(42, 'uint32');
```

### React Hook

```typescript
import { useFhevmEncrypt } from '@fhevm/sdk';

function MyComponent() {
  const { encrypt, isEncrypting } = useFhevmEncrypt();

  const handleClick = async () => {
    const result = await encrypt(42, 'uint32');
  };
}
```
````

## 🎯 Adding Framework Support

Want to add Vue/Svelte/Angular support? Here's how:

### 1. Create Framework Directory

```
packages/fhevm-sdk/src/vue/
└── composables.ts
```

### 2. Implement Framework-Specific Code

```typescript
// Vue example
import { ref, Ref } from 'vue';
import { FhevmClient } from '../client';

export function useFhevmEncrypt(client: FhevmClient) {
  const isEncrypting: Ref<boolean> = ref(false);
  const error: Ref<Error | null> = ref(null);

  const encrypt = async (value: number | bigint, type: EncryptedType) => {
    isEncrypting.value = true;
    error.value = null;

    try {
      return await client.encrypt(value, type);
    } catch (e) {
      error.value = e as Error;
      return null;
    } finally {
      isEncrypting.value = false;
    }
  };

  return { encrypt, isEncrypting, error };
}
```

### 3. Export in Package

```typescript
// packages/fhevm-sdk/src/index.ts
export * from './vue/composables';
```

### 4. Add Example

Create `examples/vue-example` with a working demo.

### 5. Document

Update README with Vue-specific instructions.

## 🧪 Writing Tests

### Test Structure

```typescript
import { FhevmClient } from '../client';

describe('FhevmClient', () => {
  let client: FhevmClient;

  beforeEach(() => {
    // Setup
    client = new FhevmClient({ provider, network: 11155111 });
  });

  it('should encrypt uint32 values', async () => {
    await client.initialize();
    const result = await client.encrypt(42, 'uint32');

    expect(result).toBeDefined();
    expect(result.handles).toHaveLength(1);
    expect(result.proof).toBeTruthy();
  });

  it('should throw error if not initialized', async () => {
    await expect(
      client.encrypt(42, 'uint32')
    ).rejects.toThrow('FHEVM client not initialized');
  });
});
```

### Test Coverage

Aim for:
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >90%
- **Lines**: >80%

## 📞 Getting Help

- **Discord**: [Zama Community](https://discord.gg/zama)
- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bugs and features

## 🎉 Recognition

Contributors will be:
- Listed in [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- Mentioned in release notes
- Thanked in the README

Thank you for contributing to FHEVM SDK! 🙏

---

**Questions?** Feel free to ask in GitHub Discussions or Discord!
