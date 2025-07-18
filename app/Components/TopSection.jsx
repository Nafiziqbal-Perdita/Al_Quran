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
        className="flex-row items-center px-6 py-4 rounded-b-3xl shadow-2xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(30px)',
          shadowColor: colors.accent,
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 12,
          height: 80,
          minHeight: 80,
          maxHeight: 80,
          paddingTop: 16,
          paddingBottom: 16,
          zIndex: 1,
          borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Advanced glassmorphic background with multi-layer effect */}
        <View 
          className="absolute inset-0 rounded-b-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            backgroundColor: colors.cardBackground,
            opacity: 0.95,
          }}
        />
        
        {/* Premium gradient accent line with animation effect */}
        <View 
          className="absolute bottom-0 left-0 right-0 h-1.5"
          style={{
            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            backgroundColor: colors.accent,
          }}
        />
        
        {/* Secondary gradient overlay for depth */}
        <View 
          className="absolute bottom-1.5 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundColor: 'rgba(255,255,255,0.2)',
          }}
        />
        
        <Image
          source={require("../../assets/images/mainIcon.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            borderRadius: 16,
            marginRight: 20,
            zIndex: 1,
            shadowColor: colors.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 6,
          }}
        />
        <View style={{ zIndex: 1 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: colors.buttonPrimary,
              textShadowColor: colors.primaryText === '#F7FAFC' ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.15)",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
              zIndex: 1,
              letterSpacing: 0.5,
            }}
          >
            Al Quran
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: 42,
                height: 4,
                marginRight: 12,
                borderRadius: 999,
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                backgroundColor: colors.accent,
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 3,
              }}
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: colors.secondaryText,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
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