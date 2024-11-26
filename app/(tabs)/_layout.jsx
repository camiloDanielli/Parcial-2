import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          tabBarLabel: "Home", // Nombre mostrado en la pestaña
        }}
      />
      <Stack.Screen
        name="Editar"
        options={{
          tabBarLabel: "editar", // Nombre mostrado en la pestaña
        }}
      />
    </Stack>
  );
}
