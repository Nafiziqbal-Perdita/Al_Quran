import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SavedVersesProvider } from "./context/SavedVersesContext";
import { SettingsProvider } from "./context/SettingsContext";
import "./global.css";

export default function RootLayout() {
  return (
    <SettingsProvider>
      <SafeAreaProvider>
        <SavedVersesProvider>
          <StatusBar hidden={true} />
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "none",
              contentStyle: { backgroundColor: "white" },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="surah/[id]" />
          </Stack>
        </SavedVersesProvider>
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
