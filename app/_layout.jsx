import { Slot, Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { BackHandler, Linking, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ExitModal from "./Components/ExitModal";
import { SavedVersesProvider } from "./context/SavedVersesContext";
import { SettingsProvider, useSettings } from "./context/SettingsContext";

import "./global.css";

function Layout() {
  const { getColors } = useSettings();
  const colors = getColors();
  const [showExitModal, setShowExitModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      // Only show exit modal on the home tab
      if (pathname === "/" || pathname === "/(tabs)/index") {
        setShowExitModal(true);
        return true;
      }
      // Let the default back behavior work for other screens
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [pathname]);

  const handleExit = () => {
    BackHandler.exitApp();
  };

  const handleRate = async () => {
    const packageName = "com.nafiziqbal.QuranicApp";
    const url = `market://details?id=${packageName}`;
    try {
      await Linking.openURL(url);
    } catch {
      // If Play Store fails, try web URL
      await Linking.openURL(
        `https://play.google.com/store/apps/details?id=${packageName}`
      );
    }
  };

  return (
    <>
      <StatusBar
        barStyle={colors.darkMode ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors.background },
          customAnimationOnGesture: true,
          fullScreenGestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="surah/[id]"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack>

      <ExitModal
        visible={showExitModal}
        onClose={() => setShowExitModal(false)}
        onExit={handleExit}
        onRate={handleRate}
      />
    </>
  );
}

// This is the default export that expo-router needs
export default function RootLayout() {
  return (
    <SettingsProvider>
      <SafeAreaProvider>
        <SavedVersesProvider>
          <Layout />
        </SavedVersesProvider>
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
