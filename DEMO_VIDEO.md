# 📺 Demo Video

## Video Overview

This 3-minute demonstration video showcases the FHEVM SDK in action, covering:

### Timeline

**0:00 - 0:30** - Quick Start
- Install SDK with npm
- Initialize FHEVM client
- First encryption in 5 lines of code

**0:30 - 1:00** - React Integration
- FhevmProvider setup
- useFhevmEncrypt hook demonstration
- Real-time encryption in UI

**1:00 - 1:30** - Patent Protection Demo
- Submit encrypted patent application
- View applications list
- Role-based access demonstration

**1:30 - 2:00** - Decryption Workflow
- EIP-712 signature request
- User authorization
- Decrypted data display

**2:00 - 2:30** - Framework Agnostic
- Show core SDK usage without React
- Demonstrate TypeScript autocomplete
- Instance caching performance

**2:30 - 3:00** - Deployment & Summary
- Live deployment URL
- Key features recap
- Get started instructions

## Video File

The actual video demonstration is included in this repository as `demo.mp4`.

**Note**: If `demo.mp4` is not present, please record your own demonstration following the timeline above.

## Recording Instructions

If you need to create the demo video:

### Setup

1. Use screen recording software (OBS, Loom, QuickTime, etc.)
2. Set resolution to 1920x1080 (1080p)
3. Enable microphone for narration
4. Prepare the Next.js example running locally

### Script

```markdown
[0:00] "Hi! This is the FHEVM SDK - a universal SDK for building confidential dApps.
Let me show you how easy it is to get started."

[0:10] "First, install the SDK with a single command: npm install @fhevm/sdk"

[0:15] "Then, initialize and encrypt data in just 5 lines of code..."
[Show code editor with quick start example]

[0:30] "For React developers, we provide wagmi-style hooks that feel familiar..."
[Show React component with useFhevmEncrypt hook]

[0:45] "Let's see it in action with our patent protection example..."
[Switch to browser with Next.js app running]

[1:00] "Users can submit patent applications with all data fully encrypted on-chain..."
[Fill out patent application form, click submit]

[1:15] "Examiners can review applications with proper authorization..."
[Switch to examiner tab]

[1:30] "When decrypting data, the SDK automatically handles EIP-712 signatures..."
[Trigger decrypt, show MetaMask signature request]

[1:45] "All of this is type-safe with full TypeScript support..."
[Show TypeScript autocomplete in VS Code]

[2:00] "The SDK is framework-agnostic - the core works with any JavaScript environment..."
[Show vanilla JS example]

[2:15] "And it's highly performant with instance caching and retry logic built-in..."
[Show performance comparison]

[2:30] "The example is deployed and ready to try at [URL]..."
[Show live deployment]

[2:45] "To get started, check out the README and install with npm. Happy building!"
[Show README in browser]
```

### Export Settings

- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 (1080p)
- **Frame Rate**: 30 fps
- **Bitrate**: 5-8 Mbps
- **Audio**: AAC, 128 kbps, 44.1 kHz

### Tips

- Keep cursor movements smooth
- Use zoom for important code sections
- Clear browser cache before recording
- Test audio levels before recording
- Record in a quiet environment
- Consider adding background music (optional)

## Alternative: Use Screenshots

If video recording is not available, create a series of screenshots showing:

1. Installation command
2. Code example
3. Running application
4. Encryption in action
5. Decryption with MetaMask
6. Live deployment

Compile these into a PDF or image gallery with annotations.

## Hosting Options

If the video file is too large for GitHub:

- **YouTube**: Upload as unlisted video
- **Loom**: Record and share link
- **Vimeo**: Upload and embed
- **Google Drive**: Share with public link
- **IPFS**: Decentralized hosting

Update README.md with the video link once hosted.

---

**Current Status**: 🎬 Video file `demo.mp4` should be placed in root directory

For questions about the demo, check [CONTRIBUTING.md](./CONTRIBUTING.md)
