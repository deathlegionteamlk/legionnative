# Components

**UI primitives that work everywhere.**

By **DEMO X HEXA** | **Death Legion Team**

---

## View

The building block. Like a `div` but for mobile.

```tsx
import { View } from '@legion/runtime';

<View style={{ padding: 20, backgroundColor: '#fff' }}>
  <Text>Hello</Text>
</View>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `style` | StyleProps | Styles |
| `children` | ReactNode | Child components |
| `onLayout` | function | Called on layout |
| `accessible` | boolean | Accessibility |
| `accessibilityLabel` | string | Screen reader text |

---

## Text

Renders text. Handles fonts, colors, everything.

```tsx
import { Text } from '@legion/runtime';

<Text style={{ fontSize: 16, fontWeight: 'bold' }}>
  Hello World
</Text>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `style` | TextStyle | Text styles |
| `numberOfLines` | number | Truncate after N lines |
| `ellipsizeMode` | string | `head`, `middle`, `tail`, `clip` |
| `selectable` | boolean | Can user select? |
| `onPress` | function | Tap handler |

---

## Image

Local or remote images. Automatic caching.

```tsx
import { Image } from '@legion/runtime';

<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `source` | ImageSource | URL or local asset |
| `style` | ImageStyle | Size and styles |
| `resizeMode` | string | `cover`, `contain`, `stretch`, `center` |
| `blurRadius` | number | Blur amount |
| `onLoad` | function | Loaded callback |
| `onError` | function | Error callback |

---

## ScrollView

Scrollable container. Pull-to-refresh built in.

```tsx
import { ScrollView } from '@legion/runtime';

<ScrollView 
  contentContainerStyle={{ padding: 20 }}
  showsVerticalScrollIndicator={false}
>
  {/* Content */}
</ScrollView>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `contentContainerStyle` | StyleProps | Inner container styles |
| `showsVerticalScrollIndicator` | boolean | Show scrollbar |
| `showsHorizontalScrollIndicator` | boolean | Show scrollbar |
| `refreshControl` | RefreshControl | Pull to refresh |
| `onScroll` | function | Scroll event |
| `stickyHeaderIndices` | number[] | Sticky headers |

---

## FlatList

Virtualized list. Handles 10,000+ items.

```tsx
import { FlatList } from '@legion/runtime';

<FlatList
  data={items}
  renderItem={({ item }) => <Text>{item.name}</Text>}
  keyExtractor={item => item.id}
  ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | array | Items to render |
| `renderItem` | function | Render each item |
| `keyExtractor` | function | Unique key per item |
| `numColumns` | number | Grid layout |
| `onEndReached` | function | Infinite scroll |
| `onEndReachedThreshold` | number | When to trigger |

---

## TextInput

Text input field. Keyboard handling included.

```tsx
import { TextInput } from '@legion/runtime';

<TextInput
  value={text}
  onChangeText={setText}
  placeholder="Enter text..."
  keyboardType="email-address"
  autoCapitalize="none"
  autoCorrect={false}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | string | Current value |
| `onChangeText` | function | Change handler |
| `placeholder` | string | Placeholder text |
| `keyboardType` | string | Keyboard type |
| `secureTextEntry` | boolean | Password mode |
| `multiline` | boolean | Multiple lines |
| `autoFocus` | boolean | Focus on mount |

---

## Button

Basic button. For custom styling, use Pressable.

```tsx
import { Button } from '@legion/runtime';

<Button 
  title="Submit" 
  onPress={handleSubmit}
  color="#007AFF"
  disabled={isLoading}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | string | Button text |
| `onPress` | function | Tap handler |
| `color` | string | Button color |
| `disabled` | boolean | Disabled state |
| `accessibilityLabel` | string | Screen reader text |

---

## Pressable

Custom pressable area. Build your own buttons.

```tsx
import { Pressable } from '@legion/runtime';

<Pressable
  onPress={handleTap}
  onLongPress={handleLongPress}
  style={({ pressed }) => ({
    opacity: pressed ? 0.5 : 1,
    padding: 16,
  })}
>
  <Text>Custom Button</Text>
</Pressable>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onPress` | function | Tap handler |
| `onLongPress` | function | Long press handler |
| `style` | function | Dynamic styles |
| `hitSlop` | object | Expand touch area |
| `android_ripple` | object | Ripple effect |

---

## SafeArea

Respects notches, home indicators, status bars.

```tsx
import { SafeArea } from '@legion/runtime';

<SafeArea style={{ flex: 1 }}>
  {/* Content safe from notches */}
</SafeArea>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `style` | StyleProps | Container styles |
| `edges` | string[] | Which edges: `top`, `bottom`, `left`, `right` |

---

## Animated

Animation primitives. 60fps guaranteed.

```tsx
import { Animated, useEffect } from '@legion/runtime';

function FadeIn({ children }) {
  const opacity = new Animated.Value(0);
  
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
    }).start();
  }, []);
  
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}
```

### Methods

| Method | Description |
|--------|-------------|
| `timing` | Easing-based animation |
| `spring` | Spring physics |
| `decay` | Deceleration |
| `parallel` | Run multiple animations |
| `sequence` | Chain animations |
| `stagger` | Staggered start |

---

## RefreshControl

Pull-to-refresh component. Use with ScrollView.

```tsx
import { ScrollView, RefreshControl } from '@legion/runtime';

function Feed() {
  const [refreshing, setRefreshing] = useState(false);
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await fetchData();
            setRefreshing(false);
          }}
        />
      }
    >
      {/* Content */}
    </ScrollView>
  );
}
```

---

## ActivityIndicator

Loading spinner.

```tsx
import { ActivityIndicator } from '@legion/runtime';

<ActivityIndicator size="large" color="#007AFF" />
```

---

## Modal

Full-screen overlays.

```tsx
import { Modal, View, Button } from '@legion/runtime';

<Modal visible={visible} transparent animationType="slide">
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Button title="Close" onPress={() => setVisible(false)} />
  </View>
</Modal>
```

---

**Built by DEMO X HEXA × Death Legion Team**
