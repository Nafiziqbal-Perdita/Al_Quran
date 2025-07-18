import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const ListHeader = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="px-6 py-4 h-20"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <View className="flex-row items-center mb-2">
            <Text 
              className="text-xl font-bold mr-3"
              style={{ 
                color: colors.primaryText,
                textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
                letterSpacing: 0.3,
                fontWeight: '700',
              }}
            >
              All Surahs
            </Text>
            <Ionicons 
              name="book-outline" 
              size={22} 
              color={colors.accent}
            />
          </View>
          <View className="flex-row items-center">
            <View 
              className="w-8 h-1 rounded-full mr-3"
              style={{ 
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundColor: colors.accent,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 2,
              }}
            />
            <Text 
              className="text-xs font-medium"
              style={{ 
                color: colors.secondaryText,
                letterSpacing: 0.3,
                textTransform: 'uppercase',
                fontWeight: '500',
              }}
            >
              114 Surahs in the Holy Quran
            </Text>
          </View>
        </View>

        <View 
          className="w-12 h-12 rounded-2xl items-center justify-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(78, 144, 226, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
            backgroundColor: `${colors.buttonPrimary}15`,
            borderWidth: 1.5,
            borderColor: `${colors.buttonPrimary}25`,
            shadowColor: colors.buttonPrimary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text 
            className="text-lg font-bold"
            style={{ 
              color: colors.buttonPrimary,
              textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.4)' : `${colors.buttonPrimary}30`,
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
              fontWeight: '700',
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