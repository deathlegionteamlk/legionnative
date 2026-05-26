<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=40&duration=3000&pause=1000&color=6C63FF&center=true&vCenter=true&width=600&lines=LEGION+Native;Cross-Platform.+No+Excuses.;Built+Different." alt="LEGION Native" />

<br/>

![Version](https://img.shields.io/badge/version-0.1.0-6C63FF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-00D9A3?style=for-the-badge)
![Node](https://img.shields.io/badge/node-%3E%3D18-339933?style=for-the-badge&logo=node.js)
![Platform](https://img.shields.io/badge/platforms-Android%20%7C%20iOS%20%7C%20Web-FF6B6B?style=for-the-badge)

<br/>

<img src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif" width="480" alt="coding animation"/>

<br/>

> **Made by [DEMO X HEXA](https://github.com/legion-native) × Death Legion Team**
> *We shipped apps with every other framework. Then got tired of the same problems. So we fixed them.*

</div>

---

## <i class="bi bi-exclamation-triangle-fill"></i> &nbsp; ![badge](https://img.shields.io/badge/-THE%20PROBLEM-FF6B6B?style=flat-square&logoColor=white) &nbsp; The Real Problem

Your app takes 3 seconds to cold start. Hot reload is a lie. You added one dependency and somehow the bundle grew by 400KB. Your users are on $100 Android phones with spotty connections — and your framework just doesn't care.

We do.

---

## <img src="https://img.shields.io/badge/-PERFORMANCE-6C63FF?style=flat-square" /> &nbsp; Numbers, Not Marketing

<div align="center">

<img src="https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" width="300" alt="speed" />

</div>

| ![metric](https://img.shields.io/badge/Metric-1a1a2e?style=flat-square) | ![target](https://img.shields.io/badge/Target-6C63FF?style=flat-square) | ![why](https://img.shields.io/badge/Why%20It%20Matters-00D9A3?style=flat-square) |
|:---|:---|:---|
| ⚡ Cold Start | **< 100ms** | Users don't wait. They leave. |
| 🔄 Hot Reload | **< 50ms** | You ship faster, not slower |
| 📦 Base Bundle | **< 50KB** | Downloads matter on 3G |
| 🧠 Memory | **< 20MB** | Budget devices actually work |
| 📡 Offline | **Full** | No connection? No problem |

---

## <img src="https://img.shields.io/badge/-WHAT%20YOU%20GET-00D9A3?style=flat-square" /> &nbsp; What You Actually Get

<div align="center">
<img src="https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif" width="400" alt="features" />
</div>

### ⚡ Speed

Startup is instant because the runtime is tree-shaken. Hot reload runs on Vite's HMR engine — we measured it at under 50ms, not "blazing fast" in a blog post. Incremental compilation only rebuilds what changed, so a 2-file edit doesn't recompile your whole app.

### 🧑‍💻 Developer Experience

File-based routing means you drop a file in `screens/` and it becomes a route. No boilerplate, no route config, no forgetting to register it somewhere. TypeScript works out of the box. `legion doctor` tells you what's broken before you spend an hour debugging.

### 🚀 Production Ready

OTA updates without waiting for app store reviews. Automatic asset optimization (images, fonts, the stuff you always forget). Real offline caching with background sync — not "cache one screen and call it offline-first."

### 🌍 Works Everywhere

Android (including Go edition devices with 1GB RAM), iOS, and web — same code, no platform checks, no `if (Platform.OS === 'android')` scattered through your components.

---

## <img src="https://img.shields.io/badge/-INSTALLATION-FF6B6B?style=flat-square" /> &nbsp; Getting Started

<div align="center">
<img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" width="300" alt="install" />
</div>

No Xcode path nightmares. No Android SDK environment variable hell. No 20-step setup guide.

```bash
npm install -g @legion/cli
legion create my-app
cd my-app
legion start
```

Done. You're running.

---

## <img src="https://img.shields.io/badge/-CODE%20EXAMPLE-1a1a2e?style=flat-square&color=6C63FF" /> &nbsp; What a Component Looks Like

<div align="center">
<img src="https://media.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif" width="320" alt="code" />
</div>

No provider wrappers. No context stacked 10 deep. No boilerplate you copy from a template and never fully understand.

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

---

## <img src="https://img.shields.io/badge/-CLI%20COMMANDS-00D9A3?style=flat-square" /> &nbsp; CLI That Actually Helps

| ![command](https://img.shields.io/badge/Command-1a1a2e?style=flat-square) | ![does](https://img.shields.io/badge/What%20It%20Does-6C63FF?style=flat-square) |
|:---|:---|
| `legion create <name>` | Scaffold a new project |
| `legion start` | Dev server with hot reload |
| `legion build android` | APK or AAB, your choice |
| `legion build ios` | IPA ready for TestFlight |
| `legion build web` | Static files for any host |
| `legion deploy` | Push OTA updates instantly |
| `legion doctor` | Diagnose your environment |
| `legion generate screen <name>` | Screen + routing, done |

---

## <img src="https://img.shields.io/badge/-PROJECT%20LAYOUT-FF6B6B?style=flat-square" /> &nbsp; Project Structure

```
my-app/
├── src/
│   ├── App.tsx              # Entry point
│   ├── screens/             # Drop files here → they become routes
│   │   ├── index.tsx        # Home (/)
│   │   ├── profile.tsx      # /profile
│   │   └── settings.tsx     # /settings
│   ├── components/          # Reusable stuff
│   ├── hooks/               # Custom hooks
│   └── utils/               # Helpers
├── assets/                  # Images, fonts, sounds
├── plugins/                 # WASM plugins (optional)
├── index.html               # Web entry
└── legion.config.js         # Config with sensible defaults
```

File-based routing means: drop a file in `screens/`, it's a route. Nested folders become nested routes. You don't register anything.

---

## <img src="https://img.shields.io/badge/-CONFIGURATION-6C63FF?style=flat-square" /> &nbsp; Config

You can delete this file entirely and the app still works. But when you need it:

```javascript
// legion.config.js
export default {
  appId: 'com.yourcompany.app',
  appName: 'Your App',
  version: '1.0.0',
  platforms: ['android', 'ios', 'web'],

  theme: {
    light: { primary: '#007AFF' },
    dark:  { primary: '#0A84FF' },
  },

  channel: 'stable',   // OTA update channel

  optimize: {
    images: true,
    fonts: true,
  },
};
```

---

## <img src="https://img.shields.io/badge/-UNDER%20THE%20HOOD-1a1a2e?style=flat-square&color=FF6B6B" /> &nbsp; How It's Built

<div align="center">
<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" width="360" alt="under the hood" />
</div>

```
LEGION Native Stack
├─ TypeScript Runtime     → Type-safe, zero overhead
├─ Rust Core              → Native ops (memory, fs, network)
├─ Node.js CLI            → Fast tooling, no Java
├─ Vite Dev Server        → HMR that's actually instant
├─ Skia Rendering         → Same pixels on every device
└─ WASM Plugin System     → Write native code in any language
```

The Rust core handles what JavaScript is slow at: file I/O, crypto, image processing, network requests. The rest stays in TypeScript where you can read it, debug it, and understand it.

---

## <img src="https://img.shields.io/badge/-PACKAGES-00D9A3?style=flat-square" /> &nbsp; Core Packages

| ![pkg](https://img.shields.io/badge/Package-1a1a2e?style=flat-square) | ![purpose](https://img.shields.io/badge/Purpose-6C63FF?style=flat-square) |
|:---|:---|
| `@legion/runtime` | Components, hooks, navigation |
| `@legion/cli` | All the commands above |
| `@legion/plugins` | WASM loader and plugin API |

---

## <img src="https://img.shields.io/badge/-DOCS-6C63FF?style=flat-square" /> &nbsp; Documentation

- 📖 [Getting Started](./docs/README.md) — First app in 5 minutes
- 🧩 [Components](./docs/components.md) — All UI primitives
- 🗺️ [Routing](./docs/routing.md) — Navigation patterns
- 📱 [Native Modules](./docs/native-modules.md) — Camera, storage, sensors
- 🚀 [Deployment](./docs/deployment.md) — Ship to stores and OTA

---

## <img src="https://img.shields.io/badge/-WHO%20BUILT%20THIS-FF6B6B?style=flat-square" /> &nbsp; Who Made This

**DEMO X HEXA** and the **Death Legion Team** built LEGION Native after shipping apps with every other framework and hitting the same walls every time: slow starts on budget phones, hot reload that didn't, bundles that grew with every dependency, "offline-first" meaning "cache one screen."

This is what we wish we had. Use it. Break it. Tell us what's wrong.

---

## <img src="https://img.shields.io/badge/-CONTRIBUTING-00D9A3?style=flat-square" /> &nbsp; Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md). PRs, bug reports, and feature requests are all open. No gatekeeping.

---

## <img src="https://img.shields.io/badge/-INSPIRED%20BY-6C63FF?style=flat-square" /> &nbsp; Inspired By (But Different)

| ![name](https://img.shields.io/badge/Project-1a1a2e?style=flat-square) | ![what](https://img.shields.io/badge/What%20We%20Took-00D9A3?style=flat-square) | ![left](https://img.shields.io/badge/What%20We%20Left-FF6B6B?style=flat-square) |
|:---|:---|:---|
| **Expo** | Great DX | Too heavy |
| **React Native** | Great idea | Slow execution |
| **Vite** | Build speed as baseline | N/A |
| **Flutter** | Consistent rendering | Dart |

We took what worked, removed what didn't, rebuilt the rest.

---

## <img src="https://img.shields.io/badge/License-MIT-6C63FF?style=flat-square" /> &nbsp; License

MIT. Do whatever you want.

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=4000&pause=500&color=00D9A3&center=true&vCenter=true&width=500&lines=Made+by+humans%2C+for+humans.;DEMO+X+HEXA+%C3%97+Death+Legion+Team" alt="footer typing" />

<br/><br/>

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/legion-native)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/legion)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/legion_native)

<br/>

<img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100" alt="rocket" />

**DEMO X HEXA × Death Legion Team**

</div>
