import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: "Personagens" }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Detalhes" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
