# LEGION Native

**Cross-platform mobile apps that don't suck.**

Built by **DEMO X HEXA** | **Death Legion Team**

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

---

## The Problem

Most mobile frameworks are bloated. Your app takes 3 seconds to start. Hot reload takes forever. You need 500MB of RAM just to render a list. Meanwhile, your users are on $100 Android phones with spotty connections.

LEGION Native fixes this.

## Performance Targets (Not Marketing Fluff)

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Cold Start | < 100ms | Users don't wait |
| Hot Reload | < 50ms | You ship faster |
| Base Bundle | < 50KB | Downloads matter |
| Memory | < 20MB | Low-end devices work |
| Offline Support | Full | No connection? No problem |

---

## What You Get

### Speed
- Instant startup with tree-shaken runtime
- Sub-50ms hot reload using Vite's HMR engine
- Incremental compilation - only rebuild what changed

### Developer Experience
- File-based routing (put files in folders, get routes)
- TypeScript out of the box
- `legion doctor` tells you what's broken before you ask
- Zero-config builds for Android, iOS, and web

### Production Ready
- OTA updates without app store reviews
- Automatic asset optimization (images, fonts, etc.)
- Offline caching with background sync
- WASM plugin system for custom native code

### Works Everywhere
- Android (including Go edition devices)
- iOS (iPhone and iPad)
- Web (PWA with offline support)
- Same code, no platform checks needed

---

## Installation

```bash
npm install -g @legion/cli
legion create my-app
cd my-app
legion start
```

That's it. No Xcode setup. No Android SDK path nightmares. No 20-step tutorials.

---

## Code Example

```tsx
import { View, Text, Button } from '@legion/runtime';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24 }}>Count: {count}</Text>
      <Button 
        title="Add One" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}
```

No boilerplate. No provider wrappers. No context providers stacked 10 deep. Just a component.

---

## CLI Commands That Actually Help

| Command | What It Does |
|---------|--------------|
| `legion create <name>` | Scaffold a new project |
| `legion start` | Dev server with hot reload |
| `legion build android` | APK or AAB, your choice |
| `legion build ios` | IPA ready for TestFlight |
| `legion build web` | Static files for any host |
| `legion deploy` | Push OTA updates instantly |
| `legion doctor` | Diagnose environment issues |
| `legion generate screen <name>` | Create screen with routing |

---

## Project Layout

```
my-app/
├── src/
│   ├── App.tsx              # Entry point
│   ├── screens/             # Auto-routed screens
│   │   ├── index.tsx        # Home (/)
│   │   ├── profile.tsx      # /profile
│   │   └── settings.tsx     # /settings
│   ├── components/          # Your reusable stuff
│   ├── hooks/               # Custom hooks
│   └── utils/               # Helpers
├── assets/                  # Images, fonts, sounds
├── plugins/                 # WASM plugins (optional)
├── index.html               # Web entry
└── legion.config.js         # Config (sensible defaults)
```

File-based routing means: drop a file in `screens/`, it becomes a route. Nested folders become nested routes. Done.

---

## Configuration

```javascript
// legion.config.js
export default {
  appId: 'com.yourcompany.app',
  appName: 'Your App',
  version: '1.0.0',
  platforms: ['android', 'ios', 'web'],
  
  // Optional - everything has defaults
  theme: {
    light: { primary: '#007AFF' },
    dark: { primary: '#0A84FF' },
  },
  
  // OTA update channel
  channel: 'stable',
  
  // Asset optimization
  optimize: {
    images: true,
    fonts: true,
  },
};
```

You can delete this file and everything still works.

---

## Under The Hood

```
LEGION Native Stack
├─ TypeScript Runtime     → Type-safe, zero overhead
├─ Rust Core              → Native ops (memory, fs, network)
├─ Node.js CLI            → Fast tooling, no Java
├─ Vite Dev Server        → HMR that's actually instant
├─ Skia Rendering         → Same pixels on every device
└─ WASM Plugin System     → Write native code in any language
```

The Rust core handles what JavaScript is bad at: file I/O, crypto, image processing, network requests. Everything else stays in TypeScript where you can debug it.

---

## Core Packages

| Package | Purpose |
|---------|---------|
| `@legion/runtime` | Components, hooks, navigation |
| `@legion/cli` | All the commands above |
| `@legion/plugins` | WASM loader and plugin API |

---

## Documentation

- [Getting Started](./docs/README.md) - First app in 5 minutes
- [Components](./docs/components.md) - All UI primitives
- [Routing](./docs/routing.md) - Navigation patterns
- [Native Modules](./docs/native-modules.md) - Camera, storage, sensors
- [Deployment](./docs/deployment.md) - Ship to stores and OTA

---

## Who Made This

**DEMO X HEXA** and the **Death Legion Team** built LEGION Native after shipping apps with every other framework and getting tired of the same problems:

- Slow startups on budget devices
- Hot reload that wasn't
- Bundles that grew with every dependency
- "Offline-first" meaning "cache one screen"

This is what we wish we had. Use it. Break it. Tell us what's wrong.

---

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). We accept PRs, bug reports, and feature requests. No gatekeeping.

---

## License

MIT. Do whatever you want.

---

## Inspired By (But Different)

- **Expo** - DX was right, but too heavy
- **React Native** - Great idea, slow execution
- **Vite** - Build speed is the baseline
- **Flutter** - Consistent rendering matters

We took what worked, removed what didn't, and rebuilt the rest.

---

**Made by humans, for humans.**

[GitHub](https://github.com/legion-native) | [Discord](https://discord.gg/legion) | [@legion_native](https://twitter.com/legion_native)

**DEMO X HEXA × Death Legion Team**
