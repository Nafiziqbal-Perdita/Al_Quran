import { Image, Text, View } from "react-native";
import { useSettings } from "../context/SettingsContext";

const TopSection = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="flex-row justify-between items-center px-4 py-1 rounded-b-3xl shadow-lg h-32"
      style={{ 
        backgroundColor: colors.cardBackground,
        shadowColor: colors.buttonPrimary,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        height: 64, // h-16 (64px) for a compact but not cramped header
        minHeight: 64,
        maxHeight: 64,
        paddingTop: 8,
        paddingBottom: 8,
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={require("../../assets/images/mainIcon.png")}
          style={{
            width: 40, // smaller icon for compact header
            height: 40,
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
        <View className="ml-3">
          <Text
            style={{
              fontSize: 15, // smaller font
              fontWeight: '600',
              color: colors.buttonPrimary,
              textShadowColor: "rgba(228, 175, 82, 0.15)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
            }}
          >
            Al Quran
          </Text>
          <View className="flex-row items-center mt-0.5">
            <View 
              className="w-8 h-[2px] mr-2 rounded-full" 
              style={{ backgroundColor: colors.accent }} 
            />
            <Text 
              className="text-[11px] font-medium"
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
