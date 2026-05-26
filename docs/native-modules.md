# Native Modules

**Device APIs. Simple interface.**

By **DEMO X HEXA** | **Death Legion Team**

---

## Storage

Persistent key-value store. Encrypted at rest.

```tsx
import { Storage } from '@legion/runtime';

// Save data
await Storage.set('@user_token', 'abc123');
await Storage.set('@user_data', { name: 'John', age: 30 });

// Get data
const token = await Storage.get('@user_token');
const user = await Storage.get('@user_data');

// Remove
await Storage.remove('@user_token');

// Clear all
await Storage.clear();

// Check existence
const exists = await Storage.has('@user_token');
```

### Options

```tsx
// Encrypted storage
await Storage.set('@secret', 'password', { encrypted: true });

// Expiring data (milliseconds)
await Storage.set('@temp', 'value', { expires: 3600000 });
```

---

## Network

HTTP client with caching, retries, timeouts.

```tsx
import { Network } from '@legion/runtime';

// GET request
const user = await Network.get('/api/user/123');

// With options
const data = await Network.get('/api/data', {
  cache: 'stale-while-revalidate',
  retry: 3,
  timeout: 5000,
  headers: { 'Authorization': 'Bearer token' },
});

// POST request
const result = await Network.post('/api/users', {
  name: 'John',
  email: 'john@example.com',
});

// PUT/PATCH/DELETE
await Network.put('/api/users/123', { name: 'Jane' });
await Network.patch('/api/users/123', { email: 'new@example.com' });
await Network.delete('/api/users/123');

// Upload file
const upload = await Network.upload('/api/upload', {
  file: imageUri,
  fieldName: 'image',
  onProgress: (progress) => console.log(`${progress}%`),
});

// Download file
const download = await Network.download('/api/file.pdf', {
  destination: '/path/to/save.pdf',
  onProgress: (progress) => console.log(`${progress}%`),
});
```

### Response Handling

```tsx
try {
  const response = await Network.get('/api/data');
  console.log(response.data);
  console.log(response.status);
  console.log(response.headers);
} catch (error) {
  if (error.status === 404) {
    // Not found
  } else if (error.status === 401) {
    // Unauthorized
  } else if (error.message === 'timeout') {
    // Request timed out
  } else if (error.message === 'network') {
    // No internet connection
  }
}
```

---

## Camera

Photos and videos. Permissions handled automatically.

```tsx
import { Camera } from '@legion/runtime';

// Take a photo
const photo = await Camera.takePhoto({
  quality: 0.8,
  cameraType: 'back',  // or 'front'
  flash: 'auto',       // or 'on', 'off'
  saveToGallery: true,
});

console.log(photo.uri);      // File URI
console.log(photo.width);    // Image width
console.log(photo.height);   // Image height
console.log.photo.exif);     // EXIF data

// Record a video
const video = await Camera.recordVideo({
  maxDuration: 30,  // seconds
  quality: '720p',  // or '1080p', '4k'
  saveToGallery: true,
});

// Check permissions
const hasPermission = await Camera.requestPermission();
```

---

## FileSystem

Read and write files. Access documents, cache, etc.

```tsx
import { FileSystem } from '@legion/runtime';

// Paths
const docsDir = FileSystem.documentsDirectory;
const cacheDir = FileSystem.cacheDirectory;
const tempDir = FileSystem.tempDirectory;

// Write file
await FileSystem.write(
  `${docsDir}/notes.txt`,
  'Hello World',
  { encoding: 'utf8' }
);

// Read file
const content = await FileSystem.read(`${docsDir}/notes.txt`);

// Check existence
const exists = await FileSystem.exists(`${docsDir}/notes.txt`);

// Delete file
await FileSystem.delete(`${docsDir}/notes.txt`);

// Create directory
await FileSystem.makeDirectory(`${docsDir}/backup`);

// List directory
const files = await FileSystem.listDirectory(docsDir);

// Copy file
await FileSystem.copy(
  `${docsDir}/notes.txt`,
  `${docsDir}/backup/notes.txt`
);

// Move file
await FileSystem.move(
  `${docsDir}/notes.txt`,
  `${docsDir}/backup/notes.txt`
);

// Get file info
const info = await FileSystem.getInfo(`${docsDir}/notes.txt`);
console.log(info.size);      // File size in bytes
console.log(info.mtime);     // Last modified time
```

---

## Clipboard

Copy and paste text.

```tsx
import { Clipboard } from '@legion/runtime';

// Copy
Clipboard.set('Text to copy');

// Paste
const text = await Clipboard.get();

// Check if content exists
const hasContent = await Clipboard.hasString();

// Listen for changes
const unsubscribe = Clipboard.addListener((event) => {
  console.log('Clipboard changed:', event.content);
});

// Cleanup
unsubscribe();
```

---

## DeviceInfo

Get device metadata.

```tsx
import { DeviceInfo } from '@legion/runtime';

// Basic info
const info = await DeviceInfo.getInfo();
console.log(info.deviceType);    // 'phone' | 'tablet' | 'desktop'
console.log(info.brand);         // 'Apple', 'Samsung', etc.
console.log(info.model);         // 'iPhone 14 Pro', 'Pixel 7', etc.
console.log(info.systemVersion); // iOS/Android version
console.log(info.appVersion);    // Your app version

// Screen info
const screen = await DeviceInfo.getScreen();
console.log(screen.width);       // Screen width in pixels
console.log(screen.height);      // Screen height in pixels
console.log(screen.scale);       // Pixel density
console.log(screen.fontScale);   // User's font scale preference

// Battery info
const battery = await DeviceInfo.getBattery();
console.log(battery.level);      // 0-1
console.log(battery.isCharging); // boolean

// Memory info
const memory = await DeviceInfo.getMemory();
console.log(memory.total);       // Total RAM in bytes
console.log(memory.used);        // Used RAM in bytes
console.log(memory.available);   // Available RAM in bytes
```

---

## Location

GPS coordinates and geolocation.

```tsx
import { Location } from '@legion/runtime';

// Request permission
const granted = await Location.requestPermission();

// Get current position
const position = await Location.getCurrentPosition({
  accuracy: 'high',  // or 'balanced', 'low'
  timeout: 10000,
});

console.log(position.latitude);
console.log(position.longitude);
console.log(position.altitude);
console.log(position.accuracy);
console.log(position.heading);
console.log(position.speed);

// Watch position (continuous updates)
const subscription = Location.watchPosition(
  (position) => {
    console.log('Position updated:', position);
  },
  {
    accuracy: 'high',
    interval: 5000,  // Update every 5 seconds
  }
);

// Stop watching
subscription.remove();

// Reverse geocoding (coords to address)
const address = await Location.reverseGeocode({
  latitude: 37.7749,
  longitude: -122.4194,
});

console.log(address.street);
console.log(address.city);
console.log(address.country);

// Forward geocoding (address to coords)
const coords = await Location.geocode('1600 Amphitheatre Parkway, Mountain View, CA');
```

---

## Notifications

Push notifications (local and remote).

```tsx
import { Notifications } from '@legion/runtime';

// Request permission
const granted = await Notifications.requestPermission();

// Schedule local notification
const id = await Notifications.schedule({
  title: 'Reminder',
  body: 'Don't forget your meeting!',
  trigger: {
    type: 'date',
    date: new Date('2024-01-15T10:00:00'),
  },
  data: { meetingId: '123' },
});

// Schedule repeating notification
const repeatId = await Notifications.schedule({
  title: 'Daily Standup',
  body: 'Time for standup!',
  trigger: {
    type: 'daily',
    hour: 9,
    minute: 30,
  },
});

// Cancel notification
await Notifications.cancel(id);

// Cancel all
await Notifications.cancelAll();

// Handle notification tap
Notifications.onNotificationTap((notification) => {
  console.log('Tapped notification:', notification.data);
});

// Get push token (for remote notifications)
const token = await Notifications.getPushToken();
// Send this to your server for FCM/APNS
```

---

## Sensors

Access device sensors.

```tsx
import { Sensors } from '@legion/runtime';

// Accelerometer
const accel = Sensors.accelometer.addListener((data) => {
  console.log('X:', data.x, 'Y:', data.y, 'Z:', data.z);
});

// Gyroscope
const gyro = Sensors.gyroscope.addListener((data) => {
  console.log('X:', data.x, 'Y:', data.y, 'Z:', data.z);
});

// Magnetometer (compass)
const magnet = Sensors.magnetometer.addListener((data) => {
  console.log('Heading:', data.heading);
});

// Light sensor
const light = Sensors.lightSensor.addListener((data) => {
  console.log('Lux:', data.lux);
});

// Stop listening
accel.remove();
gyro.remove();
magnet.remove();
light.remove();

// Check availability
const available = await Sensors.isAvailable('accelerometer');
```

---

## Biometrics

Face ID, Touch ID, fingerprint.

```tsx
import { Biometrics } from '@legion/runtime';

// Check availability
const isAvailable = await Biometrics.isAvailable();
console.log(isAvailable);  // true/false
console.log(isAvailable.type);  // 'face' | 'fingerprint' | null

// Authenticate
try {
  const result = await Biometrics.authenticate({
    promptMessage: 'Authenticate to continue',
    cancelTitle: 'Cancel',
    fallbackTitle: 'Use passcode',
  });
  console.log('Authenticated!');
} catch (error) {
  if (error.code === 'user_cancel') {
    // User cancelled
  } else if (error.code === 'not_recognized') {
    // Biometric not recognized
  } else if (error.code === 'lockout') {
    // Too many attempts, locked out
  }
}
```

---

## Sharing

Share content with other apps.

```tsx
import { Share } from '@legion/runtime';

// Share text
await Share.share({
  message: 'Check out this app!',
  url: 'https://example.com',
  title: 'Awesome App',
});

// Share file
await Share.share({
  url: fileUri,
  mimeType: 'image/jpeg',
});

// Share with specific apps
await Share.share({
  message: 'Hello!',
  excludedActivityTypes: ['mail', 'message'],
});
```

---

## Haptics

Vibration and haptic feedback.

```tsx
import { Haptics } from '@legion/runtime';

// Light impact
Haptics.impact('light');

// Medium impact
Haptics.impact('medium');

// Heavy impact
Haptics.impact('heavy');

// Success notification
Haptics.notification('success');

// Warning notification
Haptics.notification('warning');

// Error notification
Haptics.notification('error');

// Custom vibration pattern
Haptics.vibrate([100, 50, 100, 50, 200]);  // ms on/off pattern
```

---

**Built by DEMO X HEXA × Death Legion Team**
