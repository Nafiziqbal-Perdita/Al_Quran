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
      className="mx-4 my-3 p-6 rounded-3xl"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 18,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        overflow: 'hidden',
        minHeight: 110,
        transform: [{ scale: 1 }],
      }}
      onPress={handlePress}
      activeOpacity={0.85}
      accessibilityLabel={`Open Surah ${item.transliteration}`}
    >
      {/* Advanced glassmorphic background with gradient overlay */}
      <View 
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
          backgroundColor: colors.cardBackground,
          opacity: 0.95,
        }}
      />
      
      {/* Premium gradient accent border */}
      <View 
        className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
        style={{
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          backgroundColor: colors.accent,
        }}
      />
      
      {/* Enhanced watermark with subtle animation effect */}
      <View style={{ position: 'absolute', right: -15, top: -15, zIndex: 0 }} pointerEvents="none">
        <Text style={{
          fontSize: 95,
          color: colors.accent,
          opacity: 0.04,
          fontWeight: '900',
          textShadowColor: colors.accent,
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}>
          ﻗ
        </Text>
      </View>
      <View className="flex-row items-center justify-between" style={{ zIndex: 1 }}>
        <View className="flex-1">
          <View className="flex-row items-center mb-3">
            <View 
              className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
              style={{ 
                background: 'linear-gradient(135deg, rgba(78, 144, 226, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                backgroundColor: `${colors.accent}15`,
                borderWidth: 1.5,
                borderColor: `${colors.accent}25`,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text 
                className="text-base font-bold"
                style={{ 
                  color: colors.accent,
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.4)' : `${colors.accent}30`,
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  fontWeight: '700',
                }}
              >
                {item.id}
              </Text>
            </View>
            <View className="flex-1">
              <Text 
                className="text-lg font-bold tracking-wide mb-1"
                style={{ 
                  color: colors.primaryText, 
                  letterSpacing: 0.5,
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  fontWeight: '700',
                }}
              >
                {item.transliteration}
              </Text>
              <Text 
                className="text-sm font-medium"
                style={{ 
                  color: colors.secondaryText,
                  opacity: 0.9,
                  fontWeight: '500',
                }}
              >
                {item.englishName}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center justify-between">
            <View 
              className="px-4 py-2.5 rounded-2xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(78, 144, 226, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
                backgroundColor: `${colors.buttonPrimary}12`,
                borderWidth: 1,
                borderColor: `${colors.buttonPrimary}20`,
                minWidth: 95, 
                alignItems: 'center',
                shadowColor: colors.buttonPrimary,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
                elevation: 3,
              }}
            >
              <Text 
                className="text-xs font-semibold tracking-wider"
                style={{ 
                  color: colors.buttonPrimary,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontWeight: '600',
                }}
              >
                {item.total_verses} verses
              </Text>
            </View>
            
            {/* Premium Arabic text display */}
            <View className="flex-1 items-end ml-3">
              <Text 
                className="text-base font-medium mb-2"
                style={{ 
                  color: colors.accent, 
                  textAlign: 'right',
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  fontWeight: '500',
                }}
              >
                {item.translation}
              </Text>
              <Text 
                className="text-2xl font-semibold"
                style={{ 
                  color: colors.primaryText,
                  opacity: 0.85,
                  textAlign: 'right',
                  fontFamily: 'serif',
                  letterSpacing: 0.5,
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SurahCard;