import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const Loading = ({ message = "Loading..." }) => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: colors.background, 
      position: 'relative' 
    }}>
      {/* Enhanced watermark background with premium glow */}
      <Image
        source={require('../../assets/images/mainIcon.png')}
        style={{
          position: 'absolute',
          zIndex: 0,
          opacity: 0.05,
          width: 280,
          height: 280,
          alignSelf: 'center',
          top: '25%',
          shadowColor: colors.accent,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
        }}
        pointerEvents="none"
        resizeMode="contain"
      />
      
      {/* Premium glassmorphic loading container */}
      <View style={{ 
        zIndex: 1, 
        alignItems: 'center', 
        width: '85%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        borderRadius: 24,
        padding: 32,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.12)',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 12,
      }}>
        <ActivityIndicator size="large" color={colors.accent} style={{ marginBottom: 20 }} />
        <Text style={{ 
          color: colors.primaryText, 
          fontWeight: '700', 
          fontSize: 20, 
          textAlign: 'center',
          letterSpacing: 0.3,
          textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}>
          {message}
        </Text>
        
        {/* Premium loading indicator bar */}
        <View style={{
          width: '100%',
          height: 4,
          backgroundColor: `${colors.accent}20`,
          borderRadius: 999,
          marginTop: 16,
          overflow: 'hidden',
        }}>
          <View style={{
            width: '60%',
            height: '100%',
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            backgroundColor: colors.accent,
            borderRadius: 999,
          }} />
        </View>
      </View>
    </View>
  );
};

export default Loading;