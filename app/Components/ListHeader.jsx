import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const ListHeader = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="px-4 py-3 h-18"
      style={{ 
        backgroundColor: colors.cardBackground,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <View className="flex-row items-center mb-1">
            <Text 
              className="text-lg font-bold mr-2"
              style={{ 
                color: colors.primaryText,
                textShadowColor: 'rgba(0, 0, 0, 0.1)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              All Surahs
            </Text>
            <Ionicons 
              name="book-outline" 
              size={20} 
              color={colors.accent}
            />
          </View>
          <View className="flex-row items-center">
            <View 
              className="w-6 h-0.5 rounded-full mr-2"
              style={{ backgroundColor: colors.accent }}
            />
            <Text 
              className="text-xs"
              style={{ color: colors.secondaryText }}
            >
              114 Surahs in the Holy Quran
            </Text>
          </View>
        </View>

        <View 
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ 
            backgroundColor: `${colors.buttonPrimary}15`,
          }}
        >
          <Text 
            className="text-base font-bold"
            style={{ 
              color: colors.buttonPrimary,
            }}
          >
            ١١٤
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ListHeader;