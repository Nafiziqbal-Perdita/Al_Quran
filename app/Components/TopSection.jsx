import { Image, StyleSheet, Text, View } from "react-native";
import { useSettings } from "../context/SettingsContext";

const TopSection = () => {
  const { getColors } = useSettings();
  const colors = getColors();

  return (
    <View style={{ position: "relative", zIndex: 1 }}>
      {/* Watermark logo background */}
      <Image
        source={require("../../assets/images/mainIcon.png")}
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: 0,
            opacity: 0.07,
            width: 180,
            height: 180,
            alignSelf: "center",
            top: -30,
          },
        ]}
        pointerEvents="none"
        resizeMode="contain"
      />
      <View
        className="flex-row items-center px-4 py-1 rounded-b-3xl shadow-lg"
        style={{
          backgroundColor: colors.cardBackground,
          shadowColor: colors.buttonPrimary,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
          height: 64,
          minHeight: 64,
          maxHeight: 64,
          paddingTop: 8,
          paddingBottom: 8,
          zIndex: 1,
        }}
      >
        <Image
          source={require("../../assets/images/mainIcon.png")}
          style={{
            width: 40,
            height: 40,
            resizeMode: "contain",
            borderRadius: 10,
            marginRight: 12,
            zIndex: 1,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "700",
              color: colors.buttonPrimary,
              textShadowColor: "rgba(228, 175, 82, 0.15)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
              zIndex: 1,
            }}
          >
            Al Quran
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <View
              style={{
                width: 32,
                height: 2,
                marginRight: 8,
                borderRadius: 999,
                backgroundColor: colors.accent,
              }}
            />
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: colors.secondaryText,
              }}
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