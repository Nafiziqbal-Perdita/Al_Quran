import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const SurahCard = ({ item }) => {
  const router = useRouter();
  const { getColors } = useSettings();
  const colors = getColors();
  
  const handlePress = () => {
    router.push({
      pathname: "/surah/[id]",
      params: { id: item.id }
    });
  };

  return (
    <TouchableOpacity 
      className="mx-4 my-2 p-4 rounded-2xl"
      style={{ 
        backgroundColor: colors.cardBackground,
        shadowColor: colors.buttonPrimary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={handlePress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View 
            className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
            style={{ 
              backgroundColor: colors.buttonPrimary,
              opacity: 0.9,
            }}
          >
            <Text 
              className="text-white font-bold text-lg"
              style={{
                position: 'absolute',
                textShadowColor: 'rgba(0, 0, 0, 0.2)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {item.id}
            </Text>
            <Text className="text-white text-4xl opacity-50">۝</Text>
          </View>
          
          <View className="flex-1">
            <Text 
              className="text-xl font-semibold mb-1"
              style={{ 
                color: colors.primaryText,
                textShadowColor: 'rgba(0, 0, 0, 0.1)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 1,
              }}
            >
              {item.name}
            </Text>
            <Text 
              className="text-sm"
              style={{ color: colors.secondaryText }}
            >
              {item.transliteration}
            </Text>
          </View>
        </View>

        <View className="items-end ml-2">
          <Text 
            className="text-sm font-medium mb-1"
            style={{ color: colors.secondaryText }}
          >
            {item.translation}
          </Text>
          <View 
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: `${colors.buttonPrimary}20` }}
          >
            <Text 
              className="text-xs"
              style={{ color: colors.buttonPrimary }}
            >
              {item.total_verses} verses
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SurahCard;