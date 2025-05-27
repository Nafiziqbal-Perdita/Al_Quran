import { ActivityIndicator, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const Loading = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: colors.background }}
    >
      <View 
        className="p-8 rounded-2xl items-center shadow-lg"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
        <Text 
          className="mt-4 text-lg font-semibold"
          style={{ color: colors.primaryText }}
        >
          Loading...
        </Text>
        <Text 
          className="mt-2 text-base text-center"
          style={{ color: colors.secondaryText }}
        >
          Please wait while we prepare your App experience
        </Text>
      </View>
    </View>
  )
}

export default Loading