import React from "react";
import { Image, Text, View } from "react-native";
import { useSettings } from "../context/SettingsContext";

const TopSection = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View 
      className="flex-row  justify-between items-center px-2 py-3"
      style={{ backgroundColor: colors.cardBackground }}
    >
      <Image
        source={require("../../assets/images/mainIcon.png")}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
        }}
      />

      <View className="items-end">
        <Text
          style={{
            fontSize: 30,
           
            color: colors.buttonPrimary,
            textShadowColor: "rgba(228, 175, 82, 0.2)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        >
          Al Quran
        </Text>
        <View className="flex-row items-center mt-1">
          <View 
            className="w-8 h-[2px] mr-2" 
            style={{ backgroundColor: colors.accent }} 
          />
          <Text 
            className="text-sm"
            style={{ color: colors.secondaryText }}
          >
            The Holy Book
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TopSection;
