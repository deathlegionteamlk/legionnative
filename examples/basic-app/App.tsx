
import { View, Text, Button, ScrollView, TextInput, SafeArea } from '@legion/runtime';
import { useState } from 'react';
import { useColorScheme, useKeyboard, useSafeArea } from '@legion/runtime/hooks';

export default function ExampleApp() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const colorScheme = useColorScheme();
  const keyboard = useKeyboard();
  const insets = useSafeArea();

  const isDark = colorScheme === 'dark';
  
  const theme = {
    background: isDark ? '#1a1a2e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a2e',
    secondary: isDark ? '#16213e' : '#f5f5f5',
    accent: '#007AFF',
  };

  return (
    <SafeArea style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={{ marginBottom: 32, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text }}>
            LEGION Native
          </Text>
          <Text style={{ fontSize: 16, color: theme.text + '99', marginTop: 8 }}>
            Fast. Simple. Powerful.
          </Text>
        </View>

        <View style={{ 
          backgroundColor: theme.secondary, 
          borderRadius: 12, 
          padding: 20, 
          marginBottom: 16,
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.text, marginBottom: 16 }}>
            Counter Example
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <Button title="−" onPress={() => setCount(Math.max(0, count - 1))} color="#ff4444" />
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: theme.text, minWidth: 60, textAlign: 'center' }}>
              {count}
            </Text>
            <Button title="+" onPress={() => setCount(count + 1)} />
          </View>
        </View>

        <View style={{ 
          backgroundColor: theme.secondary, 
          borderRadius: 12, 
          padding: 20, 
          marginBottom: 16,
        }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.text, marginBottom: 12 }}>
            Text Input Example
          </Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type something..."
            placeholderTextColor={theme.text + '66'}
            style={{
              backgroundColor: theme.background,
              color: theme.text,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.text + '33',
              padding: 12,
              fontSize: 16,
            }}
          />
          {text.length > 0 && (
            <Text style={{ marginTop: 12, color: theme.text + '99' }}>
              You typed: {text}
            </Text>
          )}
        </View>

        <View style={{ 
          backgroundColor: theme.secondary, 
          borderRadius: 12, 
          padding: 20, 
          marginBottom: 16,
        }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: theme.text, marginBottom: 8 }}>
            Keyboard: {keyboard.isVisible ? `Visible (${keyboard.height}px)` : 'Hidden'}
          </Text>
          <Text style={{ color: theme.text + '99' }}>
            Safe Area: T:{insets.top} B:{insets.bottom} L:{insets.left} R:{insets.right}
          </Text>
          <Text style={{ color: theme.text + '99' }}>
            Theme: {isDark ? '🌙 Dark' : '☀️ Light'}
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 32, paddingBottom: insets.bottom }}>
          <Text style={{ color: theme.text + '66', fontSize: 14 }}>
            Built with LEGION Native v0.1.0
          </Text>
        </View>
      </ScrollView>
    </SafeArea>
  );
}
