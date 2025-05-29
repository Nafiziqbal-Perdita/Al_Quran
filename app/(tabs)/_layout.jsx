import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSettings } from '../context/SettingsContext'

const TabsLayout = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: 'none',
          tabBarStyle: {
            backgroundColor: colors.cardBackground,
            borderTopWidth: 1,
            borderTopColor: colors.divider,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.secondaryText,
          lazy: true,
          freezeOnBlur: true,
          detachInactiveScreens: false
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Setting',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}

export default TabsLayout
