import { Ionicons } from '@expo/vector-icons';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

const ExitModal = ({ visible, onClose, onExit, onRate }) => {
  const { getColors } = useSettings();
  const colors = getColors();
  
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View 
        className="flex-1 justify-center items-center" 
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <View 
          className="w-[90%] items-center px-10 pt-12 pb-10 rounded-3xl"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(30px)',
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 25 },
            shadowOpacity: 0.35,
            shadowRadius: 40,
            elevation: 25,
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          {/* Advanced glassmorphic background with multi-layer depth */}
          <View 
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)',
              backgroundColor: colors.cardBackground,
              opacity: 0.98,
            }}
          />
          
          {/* Premium gradient border with glow effect */}
          <View 
            className="absolute inset-0 rounded-3xl"
            style={{
              borderWidth: 2,
              borderColor: 'transparent',
              background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
              opacity: 0.3,
            }}
          />
          
          {/* Content */}
          <View className="relative z-10 items-center w-full">
            <View 
              className="w-24 h-24 rounded-3xl items-center justify-center mb-8"
              style={{ 
                background: 'linear-gradient(135deg, rgba(78, 144, 226, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                backgroundColor: `${colors.accent}15`,
                borderWidth: 2.5,
                borderColor: `${colors.accent}30`,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.25,
                shadowRadius: 16,
                elevation: 8,
              }}
            >
              <Ionicons name="help-circle" size={52} color={colors.accent} />
            </View>
            
            <Text 
              className="text-2xl font-semibold mb-3 text-center"
              style={{ 
                color: colors.primaryText,
                textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
                fontWeight: '600',
              }}
            >
              Are you sure?
            </Text>
            <Text 
              className="text-base mb-8 text-center" 
              style={{ 
                color: colors.secondaryText,
                fontWeight: '400',
              }}
            >
              Do you really want to exit the app?
            </Text>
            
            <View className="flex-row justify-between w-full mb-5">
              <TouchableOpacity 
                className="flex-1 py-4 rounded-2xl mr-3"
                style={{ 
                  backgroundColor: `${colors.buttonPrimary}15`,
                  borderWidth: 2,
                  borderColor: `${colors.buttonPrimary}30`,
                  shadowColor: colors.buttonPrimary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5,
                }}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text 
                  className="font-bold text-base text-center"
                  style={{ color: colors.buttonPrimary }}
                >
                  No
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="flex-1 py-4 rounded-2xl ml-3"
                style={{ 
                  backgroundColor: `${colors.error}15`,
                  borderWidth: 2,
                  borderColor: `${colors.error}30`,
                  shadowColor: colors.error,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                  elevation: 5,
                }}
                onPress={onExit}
                activeOpacity={0.7}
              >
                <Text 
                  className="font-bold text-base text-center"
                  style={{ color: colors.error }}
                >
                  Yes
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              className="flex-row items-center justify-center py-4 rounded-2xl w-full"
              style={{ 
                backgroundColor: `${colors.accent}20`,
                borderWidth: 2,
                borderColor: `${colors.accent}40`,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 8,
              }}
              onPress={onRate}
              activeOpacity={0.7}
            >
              <Ionicons name="star" size={24} color={colors.accent} style={{ marginRight: 10 }} />
              <Text 
                className="font-bold text-base text-center"
                style={{ color: colors.accent }}
              >
                Rate Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ExitModal