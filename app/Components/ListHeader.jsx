import React from 'react';
import { Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const ListHeader = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="px-4 py-3 border-b"
      style={{ 
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.divider
      }}
    >
      <Text 
        className="text-lg font-semibold"
        style={{ color: colors.accent }}
      >
        All Surahs
      </Text>
      <Text 
        className="text-sm mt-1"
        style={{ color: colors.secondaryText }}
      >
        114 Surahs in the Holy Quran
      </Text>
    </View>
  )
}

export default ListHeader 