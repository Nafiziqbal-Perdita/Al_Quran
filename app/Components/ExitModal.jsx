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
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View 
          className="w-[85%] items-center px-6 pt-8 pb-6 rounded-3xl"
          style={{ 
            backgroundColor: colors.cardBackground,
            shadowColor: colors.buttonPrimary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <Ionicons name="help-circle" size={48} color={colors.accent} style={{ marginBottom: 10 }} />
          <Text 
            className="text-2xl font-bold mb-2 text-center"
            style={{ color: colors.primaryText }}
          >
            Are you sure?
          </Text>
          <Text className="text-base mb-6 text-center" style={{ color: colors.secondaryText }}>
            Do you really want to exit the app?
          </Text>
          <View className="flex-row justify-between w-full mb-4">
            <TouchableOpacity 
              className="flex-1 py-3 rounded-xl mr-2"
              style={{ 
                backgroundColor: colors.buttonPrimary,
                shadowColor: colors.buttonPrimary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={onClose}
              activeOpacity={0.85}
            >
              <Text 
                className="font-semibold text-base text-center"
                style={{ color: colors.buttonText }}
              >
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-1 py-3 rounded-xl ml-2"
              style={{ 
                backgroundColor: colors.error,
                shadowColor: colors.error,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
              onPress={onExit}
              activeOpacity={0.85}
            >
              <Text 
                className="font-semibold text-base text-center"
                style={{ color: colors.buttonText }}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="flex-row items-center justify-center py-3 rounded-xl w-full"
            style={{ 
              backgroundColor: colors.accent,
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={onRate}
            activeOpacity={0.85}
          >
            <Ionicons name="star" size={22} color={colors.buttonText} style={{ marginRight: 8 }} />
            <Text 
              className="font-semibold text-base text-center"
              style={{ color: colors.buttonText }}
            >
              Rate Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default ExitModal