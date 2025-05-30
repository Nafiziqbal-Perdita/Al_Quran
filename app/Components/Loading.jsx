import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const Loading = ({ message = "Loading..." }) => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, position: 'relative' }}>
      {/* Watermark background */}
      <Image
        source={require('../../assets/images/mainIcon.png')}
        style={{
          position: 'absolute',
          zIndex: 0,
          opacity: 0.07,
          width: 220,
          height: 220,
          alignSelf: 'center',
          top: '30%',
        }}
        pointerEvents="none"
        resizeMode="contain"
      />
      <View style={{ zIndex: 1, alignItems: 'center', width: '100%' }}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={{ color: colors.primaryText, fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>{message}</Text>
      </View>
    </View>
  );
};

export default Loading;