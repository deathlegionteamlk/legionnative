# Routing

**File-based navigation. Zero config.**

By **DEMO X HEXA** | **Death Legion Team**

---

## How It Works

Drop a file in `src/screens/`. It becomes a route.

```
src/screens/
├── index.tsx           → /
├── profile.tsx         → /profile  
├── settings.tsx        → /settings
└── posts/
    ├── index.tsx       → /posts
    └── [id].tsx        → /posts/:id
```

No route config. No router setup. Just files.

---

## Basic Navigation

### Push a Screen

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

### Go Back

```tsx
<Button title="Back" onPress={() => nav.back()} />
```

### Replace Current

```tsx
// Useful after login
nav.replace('/home');
```

### Navigate with Params

```tsx
nav.push('/posts/123');
// or
nav.push('/posts', { id: '123' });
```

---

## Reading Route Params

```tsx
// src/screens/posts/[id].tsx
import { useRoute } from '@legion/runtime';

export default function PostDetail() {
  const params = useRoute();
  const { id } = params;
  
  return <Text>Post ID: {id}</Text>;
}
```

---

## Nested Routes

Folders create nested paths:

```
src/screens/
└── settings/
    ├── index.tsx       → /settings
    ├── profile.tsx     → /settings/profile
    └── security.tsx    → /settings/security
```

Navigate:

```tsx
nav.push('/settings/profile');
```

---

## Link Component

Declarative navigation:

```tsx
import { Link } from '@legion/runtime';

<Link to="/profile">
  <Text>My Profile</Text>
</Link>

<Link to="/posts/123" replace>
  <Text>Replace current</Text>
</Link>
```

---

## Transitions

Built-in animations:

```tsx
// Default is slide on iOS, fade on Android
nav.push('/profile');

// Custom transition
nav.push('/modal', {
  transition: 'modal',  // or 'fade', 'slide', 'none'
});
```

### Available Transitions

| Name | Description |
|------|-------------|
| `slide` | Slide from right (iOS) |
| `fade` | Cross-fade |
| `modal` | Slide up from bottom |
| `none` | No animation |

---

## Deep Linking

Configure URL schemes:

```js
// legion.config.js
export default {
  deepLinking: {
    schemes: ['myapp://', 'https://myapp.com'],
    prefixes: ['https://myapp.com/*'],
  },
};
```

Handle incoming URLs:

```tsx
import { useEffect } from 'react';
import { useNavigation } from '@legion/runtime';

function App() {
  const nav = useNavigation();
  
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const route = url.replace('myapp://', '');
      nav.push(route);
    });
    
    return () => subscription.remove();
  }, []);
}
```

---

## Navigation Guards

Protect routes:

```tsx
// src/screens/admin.tsx
import { useFocus } from '@legion/runtime';
import { useState, useEffect } from 'react';

export default function AdminScreen({ navigation }) {
  const isFocused = useFocus();
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    if (isFocused && !authorized) {
      checkAuth().then(ok => {
        if (!ok) navigation.replace('/login');
        setAuthorized(ok);
      });
    }
  }, [isFocused]);
  
  if (!authorized) return null;
  
  return <Text>Admin Content</Text>;
}
```

---

## Tab Navigation

Create tabs with a layout:

```
src/screens/
├── (tabs)/
│   ├── layout.tsx      # Tab container
│   ├── home.tsx        # Home tab
│   ├── search.tsx      # Search tab
│   └── profile.tsx     # Profile tab
```

Layout component:

```tsx
// src/screens/(tabs)/layout.tsx
import { Tabs } from '@legion/runtime';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="home" 
        title="Home"
        icon={require('@/assets/home.png')}
      />
      <Tabs.Screen 
        name="search" 
        title="Search"
        icon={require('@/assets/search.png')}
      />
      <Tabs.Screen 
        name="profile" 
        title="Profile"
        icon={require('@/assets/profile.png')}
      />
    </Tabs>
  );
}
```

---

## Stack Navigation

Nested stacks for complex flows:

```tsx
import { Stack } from '@legion/runtime';

function App() {
  return (
    <Stack>
      <Stack.Screen name="main" component={MainTabs} />
      <Stack.Screen 
        name="checkout" 
        options={{ title: 'Checkout', presentation: 'modal' }}
      />
    </Stack>
  );
}
```

---

## Programmatic Navigation

All navigation methods:

```tsx
const nav = useNavigation();

// Basic
nav.push('/screen');
nav.back();
nav.replace('/screen');
nav.popToTop();

// With params
nav.push('/user', { id: '123', name: 'John' });

// Multiple
nav.pushMultiple(['/step1', '/step2', '/step3']);

// Reset stack
nav.reset({
  index: 0,
  routes: [{ name: 'home' }],
});

// Get info
const current = nav.getCurrentRoute();
const history = nav.getHistory();
const canGoBack = nav.canGoBack();
```

---

## Events

Listen to navigation events:

```tsx
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    console.log('Screen focused');
  });
  
  return unsubscribe;
}, [navigation]);

// Available events:
// - focus: Screen comes into focus
// - blur: Screen loses focus
// - beforeRemove: Before screen is removed
```

---

## Custom Headers

Per-screen header configuration:

```tsx
// In your screen component
import { useNavigation } from '@legion/runtime';

export default function Profile() {
  const nav = useNavigation();
  
  useEffect(() => {
    nav.setOptions({
      title: 'Profile',
      headerStyle: { backgroundColor: '#007AFF' },
      headerTintColor: '#fff',
      headerRight: () => (
        <Button title="Edit" onPress={handleEdit} />
      ),
    });
  }, []);
  
  return <Text>Content</Text>;
}
```

---

## Performance Tips

1. **Lazy load screens** - They're already lazy loaded by default
2. **Use `replace` for auth flows** - Don't let users back into login
3. **Clean up listeners** - Always unsubscribe in useEffect cleanup
4. **Memoize heavy screens** - Use React.memo for complex renders

---

**Built by DEMO X HEXA × Death Legion Team**
