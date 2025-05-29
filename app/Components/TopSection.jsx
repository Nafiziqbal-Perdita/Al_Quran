import { Image, Text, View } from "react-native";
import { useSettings } from "../context/SettingsContext";

const TopSection = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="flex-row justify-between items-center px-4 py-6 rounded-b-3xl shadow-lg"
      style={{ 
        backgroundColor: colors.cardBackground,
        shadowColor: colors.buttonPrimary,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={require("../../assets/images/mainIcon.png")}
          style={{
            width: 80,
            height: 80,
            resizeMode: "contain",
            borderRadius: 20,
          }}
        />
        <View className="ml-4">
          <Text
            style={{
              fontSize: 28,
              fontWeight: '600',
              color: colors.buttonPrimary,
              textShadowColor: "rgba(228, 175, 82, 0.15)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }}
          >
            Al Quran
          </Text>
          <View className="flex-row items-center mt-1">
            <View 
              className="w-12 h-[2px] mr-2 rounded-full" 
              style={{ backgroundColor: colors.accent }} 
            />
            <Text 
              className="text-sm font-medium"
              style={{ color: colors.secondaryText }}
            >
              The Holy Book
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopSection;
