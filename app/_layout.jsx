import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="(tabs)" options={{ headerShown: false }} />
      <Tabs.Screen name="NuevoDestino" options={{ headerShown: false }} />
    </Tabs>
  );
}
