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
      params: { id: item.link }
    });
  };




  return (
    <TouchableOpacity 
      className="mx-4 my-2 p-4 rounded-2xl"
      style={{ 
        backgroundColor: colors.cardBackground,
        shadowColor: colors.cardShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: colors.divider,
        overflow: 'hidden',
        minHeight: 90,
      }}
      onPress={handlePress}
      activeOpacity={0.94}
      accessibilityLabel={`Open Surah ${item.transliteration}`}
    >
      {/* Watermark background */}
      <View style={{ position: 'absolute', right: -30, top: -30, zIndex: 0 }} pointerEvents="none">
        <Text style={{
          fontSize: 90,
          color: colors.buttonPrimary,
          opacity: 0.045,
          fontWeight: 'bold',
        }}>
          ﻗ
        </Text>
      </View>
      <View className="flex-row items-center justify-between" style={{ zIndex: 1 }}>
        <View className="flex-1">
          <Text 
            className="text-lg font-extrabold tracking-wide mb-1"
            style={{ color: colors.buttonPrimary, letterSpacing: 0.5 }}
          >
            {item.transliteration}
          </Text>
          <Text 
            className="text-2xl font-bold mb-1"
            style={{ color: colors.primaryText, fontFamily: 'serif', letterSpacing: 1 }}
          >
            {item.name}
          </Text>
          <Text 
            className="text-xs font-medium mb-1"
            style={{ color: colors.secondaryText }}
          >
            {item.englishName}
          </Text>
        </View>
        <View className="items-end ml-4">
          <Text 
            className="text-base font-semibold mb-2"
            style={{ color: colors.accent, textAlign: 'right' }}
          >
            {item.translation}
          </Text>
          <View 
            className="px-3 py-1 rounded-full mt-1"
            style={{ backgroundColor: colors.buttonSecondary, minWidth: 70, alignItems: 'center' }}
          >
            <Text 
              className="text-xs font-bold tracking-wider"
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