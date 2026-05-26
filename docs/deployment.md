# Deployment

**Ship to stores. Push OTA updates.**

By **DEMO X HEXA** | **Death Legion Team**

---

## Build for Production

### Android

```bash
# Debug build (for testing)
legion build android

# Release build (for store)
legion build android --release
```

Outputs:
- `android/app.apk` - Install directly on devices
- `android/app.aab` - Upload to Google Play

#### Signing

Create a keystore:

```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-app-alias -keyalg RSA -keysize 2048 -validity 10000
```

Configure in `legion.config.js`:

```js
export default {
  android: {
    signing: {
      keystore: './my-release-key.keystore',
      keyAlias: 'my-app-alias',
      storePassword: process.env.KEYSTORE_PASSWORD,
      keyPassword: process.env.KEY_PASSWORD,
    },
  },
};
```

---

### iOS

```bash
# Debug build
legion build ios

# Release build (for TestFlight/App Store)
legion build ios --release
```

Output: `ios/app.ipa`

#### Requirements

- Mac with Xcode 15+
- Apple Developer account ($99/year)
- Provisioning profiles configured

#### Automatic Signing

```js
// legion.config.js
export default {
  ios: {
    bundleId: 'com.yourcompany.app',
    signingTeam: 'YOUR_TEAM_ID',
    provisioningProfile: 'auto',  // or path to .mobileprovision
  },
};
```

---

### Web

```bash
legion build web
```

Output: `dist/` folder with static files.

Deploy anywhere:

```bash
# Vercel
vercel deploy dist

# Netlify
netlify deploy --dir=dist

# Cloudflare Pages
wrangler pages deploy dist

# Or copy to any web server
scp -r dist/* user@server:/var/www/html
```

It's a PWA. Works offline. Installable on home screens.

---

## OTA Updates

Skip app store reviews for most changes.

### Deploy Update

```bash
legion deploy --channel stable
```

Options:

| Flag | Description |
|------|-------------|
| `--channel` | `stable`, `beta`, `dev` |
| `--message` | Update description |
| `--mandatory` | Force update on next launch |
| `--min-version` | Only update apps >= version |

### Rollback

```bash
# Revert to previous version
legion deploy --rollback

# Revert to specific version
legion deploy --rollback --version 1.2.3
```

### What Can Update OTA

✅ JavaScript code
✅ Assets (images, fonts)
✅ CSS styles
✅ Configuration

❌ Native code changes
❌ New native modules
❌ Permission changes

When you change native code, you need a full app store release.

---

## App Store Submission

### Google Play

1. Build release AAB:
   ```bash
   legion build android --release
   ```

2. Create release in Play Console

3. Upload `app.aab`

4. Fill out store listing

5. Submit for review

Typical review time: 1-3 days

---

### Apple App Store

1. Build release IPA:
   ```bash
   legion build ios --release
   ```

2. Open Xcode → Window → Organizer

3. Select your archive → Distribute App

4. Choose "App Store Connect"

5. Follow the upload wizard

6. Complete listing in App Store Connect

7. Submit for review

Typical review time: 1-2 days

---

### TestFlight (iOS Beta)

```bash
# Build for TestFlight
legion build ios --release

# Upload via Xcode
# Then add testers in App Store Connect
```

Testers get the app within hours. No review needed for internal testers.

---

## Environment Variables

Manage secrets per environment:

```js
// legion.config.js
export default {
  env: {
    development: {
      API_URL: 'http://localhost:3000',
      DEBUG: 'true',
    },
    production: {
      API_URL: 'https://api.yourapp.com',
      DEBUG: 'false',
    },
  },
};
```

Access in code:

```tsx
import { Config } from '@legion/runtime';

const apiUrl = Config.get('API_URL');
```

---

## Code Splitting

Automatic by route. Each screen is its own chunk.

Manual splitting:

```tsx
// Lazy load heavy component
const HeavyChart = React.lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyChart data={data} />
    </Suspense>
  );
}
```

---

## Asset Optimization

Automatic optimization on build:

- Images converted to WebP
- Fonts subsetted
- SVGs optimized

Disable if needed:

```js
// legion.config.js
export default {
  optimize: {
    images: false,
    fonts: false,
  },
};
```

---

## Analytics & Monitoring

### Crash Reporting

```bash
npm install @legion/plugin-sentry
```

```js
// legion.config.js
export default {
  plugins: ['@legion/plugin-sentry'],
  sentry: {
    dsn: 'https://...',
    environment: 'production',
  },
};
```

### Analytics

```bash
npm install @legion/plugin-analytics
```

```tsx
import { Analytics } from '@legion/runtime';

Analytics.track('screen_view', { name: 'home' });
Analytics.identify(userId, { email, name });
```

---

## CI/CD Example

### GitHub Actions

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: legion build android --release
      - uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: android/app.aab

  deploy-ota:
    needs: build-android
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: legion deploy --channel beta
```

---

## Version Management

```js
// legion.config.js
export default {
  version: '1.0.0',
  buildNumber: 42,  // Incremented automatically
  
  // Auto-increment options
  versioning: {
    autoIncrement: true,
    pattern: 'major.minor.patch',
  },
};
```

CLI commands:

```bash
# Show current version
legion info

# Bump version
legion version patch  # 1.0.0 → 1.0.1
legion version minor  # 1.0.1 → 1.1.0
legion version major  # 1.1.0 → 2.0.0
```

---

## Troubleshooting

### Build Fails

Run diagnostics:

```bash
legion doctor
```

Common fixes:

```bash
# Clear caches
rm -rf node_modules .legion dist
npm install

# Android: clean gradle
cd android && ./gradlew clean

# iOS: clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

### OTA Not Working

Check:

1. Channel matches (`stable` vs `beta`)
2. Min version requirement met
3. Network connectivity on device
4. Server responding (check logs)

Debug OTA:

```bash
legion deploy --verbose
```

---

**Built by DEMO X HEXA × Death Legion Team**
