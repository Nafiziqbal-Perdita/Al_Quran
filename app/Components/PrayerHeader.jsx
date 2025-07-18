import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import {
    ActivityIndicator,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSettings } from "../context/SettingsContext";

const PrayerTimeItem = ({ name, time, icon, colors, isActive = false }) => (
  <View 
    className="flex-row items-center justify-between py-2 border-b"
    style={{ 
      borderBottomColor: colors?.divider || '#ccc',
      backgroundColor: isActive ? `${colors?.prayerTime}15` : 'transparent',
      borderRadius: isActive ? 8 : 0,
      paddingHorizontal: isActive ? 8 : 0,
    }}
  >
    <View className="flex-row items-center">
      <Ionicons 
        name={icon} 
        size={18} 
        color={isActive ? colors?.prayerTime : colors?.accent} 
      />
      <Text 
        className="ml-2 font-medium"
        style={{ 
          color: isActive ? colors?.prayerTime : colors?.primaryText, 
          fontSize: 13,
          fontWeight: isActive ? '600' : '500',
        }}
      >
        {name || '--'}
      </Text>
    </View>
    <Text 
      style={{ 
        color: isActive ? colors?.prayerTime : colors?.secondaryText, 
        fontSize: 13,
        fontWeight: isActive ? '600' : '400',
      }}
    >
      {time || '--:--'}
    </Text>
  </View>
);

const formatTime = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) return "--:--";
  try {
    const [hours, minutes] = time.split(":");
    if (isNaN(hours) || isNaN(minutes)) return "--:--";
    const hour = parseInt(hours);
    const min = parseInt(minutes);
    if (isNaN(hour) || isNaN(min)) return "--:--";
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "--:--";
  }
};

const PrayerHeader = ({ prayerData, onRetry, permissionStatus, loading }) => {
  const { getColors } = useSettings();
  const colors = getColors();
  const [isExpanded, setIsExpanded] = useState(false);

  // Defensive: fallback for missing timings object
  const timings = prayerData?.data?.timings || {};
  const hijri = prayerData?.data?.date?.hijri || {};
  const hijriMonth = hijri?.month || {};

  const openSettings = async () => {
    try {
      if (Platform.OS === "web") {
        alert(
          "Please enable location permissions in your browser settings and refresh the page."
        );
      } else if (Linking && Linking.openSettings) {
        await Linking.openSettings();
      } else {
        alert("Settings cannot be opened on this device.");
      }
    } catch (error) {
      console.error("Error handling settings:", error);
      alert(
        "Unable to open settings. Please enable location permissions manually."
      );
    }
  };

  const renderPermissionUI = () => {
    const isDenied = permissionStatus === "denied";
    return (
      <View 
        className="rounded-2xl p-4 shadow-lg items-center"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <Ionicons name="location-outline" size={40} color={colors.accent} />
        <Text 
          className="font-medium mt-2 mb-1"
          style={{ color: colors.primaryText }}
        >
          Location Access Required
        </Text>
        <Text 
          className="text-sm text-center mb-3"
          style={{ color: colors.secondaryText }}
        >
          {isDenied
            ? Platform.OS === "web"
              ? "Please enable location permissions in your browser settings and refresh the page."
              : "Location permission is permanently denied. Please enable it in settings."
            : "Please allow location access to see prayer times"}
        </Text>
        {isDenied ? (
          <TouchableOpacity
            onPress={openSettings}
            className="px-6 py-2 rounded-full flex-row items-center"
            style={{ backgroundColor: colors.buttonPrimary }}
          >
            <Ionicons name="settings-outline" size={20} color={colors.buttonText} />
            <Text 
              className="font-medium ml-2"
              style={{ color: colors.buttonText }}
            >
              {Platform.OS === "web" ? "Show Instructions" : "Open Settings"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onRetry}
            className="px-6 py-2 rounded-full flex-row items-center"
            style={{ backgroundColor: colors.buttonPrimary }}
          >
            <Ionicons name="refresh" size={20} color={colors.buttonText} />
            <Text 
              className="font-medium ml-2"
              style={{ color: colors.buttonText }}
            >
              Retry Location
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View className="h-auto mt-2 mb-2 rounded-b-3xl pb-4" style={{ backgroundColor: colors.headerBg }}>
        <View className="rounded-2xl p-4 shadow-lg items-center" style={{ backgroundColor: colors.cardBackground }}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text className="font-medium mt-2" style={{ color: colors.primaryText }}>
            Fetching prayer times...
          </Text>
        </View>
      </View>
    );
  }

  if (!prayerData?.data) {
    return (
      <View 
        className="h-auto mt-2 mb-2 rounded-b-3xl  pb-4"
        style={{ backgroundColor: colors.headerBg }}
      >
        {renderPermissionUI()}
      </View>
    );
  }

  return (
    <View 
      className="h-auto mt-2 mb-2 rounded-b-3xl pb-4"
      style={{ backgroundColor: colors.headerBg }}
    >
      <View 
        className="mt-2 rounded-3xl p-6 mx-4 shadow-2xl"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(30px)',
          shadowColor: colors.accent,
          shadowOffset: { width: 0, height: 16 },
          shadowOpacity: 0.3,
          shadowRadius: 25,
          elevation: 20,
          borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Advanced glassmorphic background with triple-layer effect */}
        <View 
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
            backgroundColor: colors.cardBackground,
            opacity: 0.95,
          }}
        />
        
        {/* Premium gradient accent border with glow effect */}
        <View 
          className="absolute inset-0 rounded-3xl"
          style={{
            borderWidth: 2,
            borderColor: 'transparent',
            background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
            opacity: 0.4,
          }}
        />
        
        {/* Inner highlight for depth */}
        <View 
          className="absolute inset-1 rounded-3xl"
          style={{
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        
        <View className="relative z-10">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text 
                className="text-sm font-medium"
                style={{ color: colors.secondaryText }}
              >
                Today
              </Text>
              <Text 
                className="font-bold text-lg"
                style={{ 
                  color: colors.primaryText,
                  textShadowColor: 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                }}
              >
                {prayerData?.data?.date?.readable || "--"}
              </Text>
            </View>
            <View 
              className="px-5 py-3 rounded-2xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(78, 144, 226, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                backgroundColor: `${colors.buttonPrimary}15`,
                borderWidth: 1.5,
                borderColor: `${colors.buttonPrimary}25`,
                shadowColor: colors.buttonPrimary,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Text 
                className="font-bold text-sm"
                style={{ 
                  color: colors.buttonPrimary,
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.4)' : `${colors.buttonPrimary}30`,
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  letterSpacing: 0.3,
                  fontWeight: '600',
                }}
              >
                {hijri?.day || "--"} {" "}
                {hijriMonth?.en || "--"}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between mb-3">
            <View className="flex-row items-center">
              <Ionicons name="sunny" size={20} color={colors.accent} />
              <View className="ml-2">
                <Text 
                  className="text-sm"
                  style={{ color: colors.secondaryText }}
                >
                  Sunrise
                </Text>
                <Text 
                  className="font-medium"
                  style={{ color: colors.primaryText }}
                >
                  {formatTime(timings?.Sunrise)}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="cloudy-night" size={20} color={colors.accent} />
              <View className="ml-2">
                <Text 
                  className="text-sm"
                  style={{ color: colors.secondaryText }}
                >
                  Sunset
                </Text>
                <Text 
                  className="font-medium"
                  style={{ color: colors.primaryText }}
                >
                  {formatTime(timings?.Sunset)}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => setIsExpanded(!isExpanded)}
            className="items-center py-3 border-t rounded-b-2xl"
            style={{ 
              borderTopColor: `${colors.divider}50`,
              backgroundColor: `${colors.accent}05`,
            }}
          >
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color={colors.accent} 
            />
          </TouchableOpacity>

          {isExpanded && (
            <View className="mt-2 p-3 rounded-2xl" style={{ backgroundColor: `${colors.cardBackground}80` }}>
              <PrayerTimeItem
                name="Fajr"
                time={formatTime(timings?.Fajr)}
                icon="sunny-outline"
                colors={colors}
              />
              <PrayerTimeItem
                name="Dhuhr"
                time={formatTime(timings?.Dhuhr)}
                icon="sunny"
                colors={colors}
              />
              <PrayerTimeItem
                name="Asr"
                time={formatTime(timings?.Asr)}
                icon="partly-sunny-outline"
                colors={colors}
              />
              <PrayerTimeItem
                name="Maghrib"
                time={formatTime(timings?.Maghrib)}
                icon="cloudy-night"
                colors={colors}
              />
              <PrayerTimeItem
                name="Isha"
                time={formatTime(timings?.Isha)}
                icon="moon"
                colors={colors}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PrayerHeader;
