import { useRouter } from 'expo-router';
import React from 'react';
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
      className="flex-row items-center justify-between p-4 border-b"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.divider
      }}
      onPress={handlePress}
    >
      <View className="flex-row items-center">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-3 shadow-md"
          style={{ backgroundColor: colors.buttonPrimary }}
        >
          <Text className="text-white font-bold text-lg" style={{position: 'absolute'}}>{item.id}</Text>
          <Text className="text-white text-4xl">۝</Text>
        </View>
        <View>
          <Text 
            className="text-2xl font-semibold"
            style={{ color: colors.primaryText }}
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
      <View className="items-end">
        <Text 
          className="text-sm"
          style={{ color: colors.secondaryText }}
        >
          {item.translation}
        </Text>
        <Text 
          className="text-xs"
          style={{ color: colors.secondaryText, opacity: 0.7 }}
        >
          {item.total_verses} verses
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SurahCard