import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useSettings } from "../context/SettingsContext";
import TopSection from "./TopSection";

const PrayerTimeItem = ({ name, time, icon, colors }) => (
  <View 
    className="flex-row items-center justify-between py-1.5 border-b"
    style={{ borderBottomColor: colors.divider }}
  >
    <View className="flex-row items-center">
      <Ionicons name={icon} size={18} color={colors.accent} />
      <Text 
        className="ml-2 font-medium"
        style={{ color: colors.primaryText }}
      >
        {name}
      </Text>
    </View>
    <Text style={{ color: colors.secondaryText }}>{time}</Text>
  </View>
);

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
};

const PrayerHeader = ({ prayerData, onRetry, permissionStatus }) => {
  const { getColors } = useSettings();
  const colors = getColors();

  const openSettings = async () => {
    try {
      if (Platform.OS === "web") {
        alert(
          "Please enable location permissions in your browser settings and refresh the page."
        );
      } else {
        await Linking.openSettings();
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

  if (!prayerData?.data) {
    return (
      <View 
        className="h-auto mt-2 mb-2 rounded-b-3xl  pb-4"
        style={{ backgroundColor: colors.headerBg }}
      >
        <TopSection />
        {renderPermissionUI()}
      </View>
    );
  }

  return (
    <View 
      className="h-auto mt-2 mb-2 rounded-b-3xl  pb-4"
      style={{ backgroundColor: colors.headerBg }}
    >
      <TopSection />

      <View 
        className=" mt-2 rounded-2xl p-3 shadow-lg"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text 
              className="text-sm"
              style={{ color: colors.secondaryText }}
            >
              Today
            </Text>
            <Text 
              className="font-semibold text-base"
              style={{ color: colors.primaryText }}
            >
              {prayerData.data.date.readable}
            </Text>
          </View>
          <View 
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.buttonPrimary }}
          >
            <Text 
              className="font-medium"
              style={{ color: colors.buttonText }}
            >
              {prayerData.data.date.hijri.day}{" "}
              {prayerData.data.date.hijri.month.en}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-2">
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
                {formatTime(prayerData.data.timings.Sunrise)}
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
                {formatTime(prayerData.data.timings.Sunset)}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-1">
          <PrayerTimeItem
            name="Fajr"
            time={formatTime(prayerData.data.timings.Fajr)}
            icon="sunny-outline"
            colors={colors}
          />
          <PrayerTimeItem
            name="Dhuhr"
            time={formatTime(prayerData.data.timings.Dhuhr)}
            icon="sunny"
            colors={colors}
          />
          <PrayerTimeItem
            name="Asr"
            time={formatTime(prayerData.data.timings.Asr)}
            icon="partly-sunny-outline"
            colors={colors}
          />
          <PrayerTimeItem
            name="Maghrib"
            time={formatTime(prayerData.data.timings.Maghrib)}
            icon="cloudy-night"
            colors={colors}
          />
          <PrayerTimeItem
            name="Isha"
            time={formatTime(prayerData.data.timings.Isha)}
            icon="moon"
            colors={colors}
          />
        </View>
      </View>
    </View>
  );
};

export default PrayerHeader;
