# LEGION Native Docs

**Everything you need to build apps.**

By **DEMO X HEXA** | **Death Legion Team**

---

## Start Here

Got 5 minutes? You can ship your first app.

```bash
npm install -g @legion/cli
legion create my-app
cd my-app
legion start
```

Your dev server spins up. Hot reload works instantly. No config files to edit. No environment variables to set.

---

## What's Inside

### Runtime (`@legion/runtime`)

The core library. Components, hooks, navigation, native APIs. All of it typed. All of it fast.

### CLI (`@legion/cli`)

Create projects, run dev server, build for production, deploy updates. One tool does everything.

### Plugins (`@legion/plugins`)

WASM-based plugin system. Write native code in Rust, Go, or C. Load it like any other module.

---

## Core Concepts

### Components Are Just Functions

```tsx
import { View, Text, Button } from '@legion/runtime';

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <View style={{ padding: 20 }}>
      <Text>{count}</Text>
      <Button title="Add" onPress={() => setCount(count + 1)} />
    </View>
  );
}
```

No HOCs. No wrapper components. No provider trees. Just render something.

### Hooks Work Like You Expect

```tsx
import { useFocus, useKeyboard, useSafeArea } from '@legion/runtime';

function Screen() {
  const focused = useFocus();        // Is this screen visible?
  const keyboard = useKeyboard();    // Keyboard height, visibility
  const insets = useSafeArea();      // Notch, home indicator spacing
  
  // That's it. No subscriptions to manage.
}
```

### Navigation Is File-Based

Put a file in `src/screens/`. It becomes a route.

```
src/screens/
├── index.tsx        → /
├── profile.tsx      → /profile
└── settings/
    └── index.tsx    → /settings
```

Navigate:

```tsx
import { useNavigation } from '@legion/runtime';

function Home() {
  const nav = useNavigation();
  
  return (
    <Button 
      title="Go to Profile" 
      onPress={() => nav.push('/profile')} 
    />
  );
}
```

Nested routes work. Params work. Deep linking works.

### Native APIs Don't Suck

```tsx
import { Storage, Network, Camera, Clipboard } from '@legion/runtime';

// Storage - async, typed, no callbacks
await Storage.set('@token', 'abc123');
const token = await Storage.get('@token');

// Network - built-in retry, timeout, caching
const user = await Network.get<User>('/api/user', {
  cache: 'stale-while-revalidate',
  retry: 3,
});

// Camera - one call, handles permissions
const photo = await Camera.takePhoto({
  quality: 0.8,
  saveToGallery: true,
});

// Clipboard - sync API
Clipboard.set('Copied!');
const text = Clipboard.get();
```

---

## Configuration

You probably don't need one. But if you do:

```js
// legion.config.js
export default {
  appId: 'com.yourcompany.app',
  name: 'Your App',
  version: '1.0.0',
  
  // Platforms to build for
  platforms: ['android', 'ios', 'web'],
  
  // Theme colors (optional)
  theme: {
    primary: '#007AFF',
    background: '#FFFFFF',
  },
  
  // Asset optimization
  optimize: {
    images: true,   // Compress and convert to WebP
    fonts: true,    // Subset and compress
  },
  
  // OTA update channel
  channel: 'stable',
};
```

Delete this file. Your app still builds.

---

## Building For Production

### Android

```bash
legion build android --release
```

Outputs:
- `app.apk` - Install directly
- `app.aab` - Upload to Play Store

Signing happens automatically if you have a keystore. If not, it creates a debug build.

### iOS

```bash
legion build ios --release
```

Outputs:
- `app.ipa` - Upload to TestFlight or App Store

Requires a Mac with Xcode. No way around that.

### Web

```bash
legion build web
```

Outputs static files to `dist/`. Deploy anywhere:

- Vercel
- Netlify
- Cloudflare Pages
- Your own server

It's a PWA. Works offline. Installable.

---

## OTA Updates

Skip the app store review process:

```bash
legion deploy --channel stable
```

Users get the update next time they open the app. Background download. Silent install.

Rollback if something breaks:

```bash
legion deploy --rollback
```

---

## Debugging

### Dev Menu

Shake your device (or press `d` in the simulator). The dev menu opens:

- Reload
- Enable/Disable hot reload
- Show performance overlay
- Open React DevTools

### Performance Overlay

Toggle it to see:
- FPS counter
- Memory usage
- Render time per frame
- JS thread load

### React DevTools

```bash
legion start --devtools
```

Then open `chrome://inspect` or the standalone React DevTools app.

---

## Common Patterns

### Pull To Refresh

```tsx
import { ScrollView, RefreshControl } from '@legion/runtime';

function Feed() {
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNewData();
    setRefreshing(false);
  };
  
  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Content */}
    </ScrollView>
  );
}
```

### Forms

```tsx
import { TextInput, Button, View } from '@legion/runtime';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const submit = async () => {
    await api.login({ email, password });
  };
  
  return (
    <View style={{ padding: 20 }}>
      <TextInput 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Email"
      />
      <TextInput 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Password"
      />
      <Button title="Log In" onPress={submit} />
    </View>
  );
}
```

### Lists

```tsx
import { FlatList, Text, View } from '@legion/runtime';

function UserList({ users }) {
  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1 }}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}
```

Virtualized. Handles 10,000 items without breaking a sweat.

---

## Troubleshooting

### "Module not found"

Run `legion doctor`. It checks:
- Node version
- Package installation
- TypeScript config
- Metro bundler cache

Usually fixes itself with `rm -rf node_modules && npm install`.

### Hot reload not working

Check that:
- You're importing from `@legion/runtime`, not relative paths
- Your file is inside `src/`
- No syntax errors (check the terminal)

### Build fails on Android

Make sure you have:
- Java 17+
- Android SDK 34+
- `ANDROID_HOME` set

Or just run `legion doctor` and follow the instructions.

---

## API Reference

### Components

| Component | Description |
|-----------|-------------|
| `View` | Container, like a div |
| `Text` | Text rendering |
| `Image` | Images from URL or local |
| `ScrollView` | Scrollable container |
| `FlatList` | Virtualized list |
| `TextInput` | Text input field |
| `Button` | Basic button |
| `Pressable` | Custom pressable area |
| `SafeArea` | Respects notches, etc. |
| `Animated` | Animation primitives |

### Hooks

| Hook | Description |
|------|-------------|
| `useState` | State management |
| `useEffect` | Side effects |
| `useContext` | Context consumption |
| `useNavigation` | Navigate between screens |
| `useRoute` | Get current route params |
| `useFocus` | Is screen focused? |
| `useKeyboard` | Keyboard state |
| `useSafeArea` | Safe area insets |
| `useColorScheme` | Light/dark mode |

### Native Modules

| Module | Description |
|--------|-------------|
| `Storage` | Persistent key-value store |
| `Network` | HTTP client with caching |
| `Camera` | Photo and video |
| `FileSystem` | Read/write files |
| `Clipboard` | Copy/paste |
| `DeviceInfo` | Device metadata |
| `Location` | GPS coordinates |
| `Notifications` | Push notifications |

---

## Next Steps

- [Component Guide](./components.md) - All UI primitives explained
- [Routing Deep Dive](./routing.md) - Nested routes, guards, transitions
- [Native Modules](./native-modules.md) - Full API reference
- [Deployment Guide](./deployment.md) - Ship to stores
- [Plugin Development](./plugins.md) - Write WASM plugins

---

**Built by DEMO X HEXA × Death Legion Team**

Questions? Bugs? Want to contribute?

[GitHub](https://github.com/legion-native) | [Discord](https://discord.gg/legion)
