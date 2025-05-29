import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const Loading = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="flex-1 justify-center items-center px-6"
      style={{ backgroundColor: colors.background }}
    >
      <View 
        className="w-full p-8 rounded-3xl items-center"
        style={{ 
          backgroundColor: colors.cardBackground,
          shadowColor: colors.buttonPrimary,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }}
      >
        <View 
          className="w-20 h-20 rounded-2xl items-center justify-center mb-6"
          style={{ 
            backgroundColor: `${colors.buttonPrimary}15`,
          }}
        >
          <View className="relative">
            <ActivityIndicator 
              size="large" 
              color={colors.accent}
              style={{
                position: 'absolute',
                top: -20,
                left: -20,
                transform: [{ scale: 1.5 }]
              }}
            />
            <Ionicons 
              name="book" 
              size={32} 
              color={colors.buttonPrimary}
            />
          </View>
        </View>

        <Text 
          className="text-xl font-bold mb-2"
          style={{ 
            color: colors.primaryText,
            textShadowColor: 'rgba(0, 0, 0, 0.1)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        >
          Loading Quran
        </Text>

        <Text 
          className="text-base text-center opacity-80"
          style={{ color: colors.secondaryText }}
        >
          Please wait while we prepare your spiritual journey
        </Text>

        <View 
          className="w-16 h-1 rounded-full mt-6"
          style={{ backgroundColor: `${colors.accent}40` }}
        >
          <View 
            className="w-8 h-1 rounded-full"
            style={{ 
              backgroundColor: colors.accent,
              shadowColor: colors.accent,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 5,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Loading;