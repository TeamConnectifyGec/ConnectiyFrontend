// app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Entry point for authentication screens */}
      <Stack.Screen name="index" options={{ title: 'Welcome' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}
