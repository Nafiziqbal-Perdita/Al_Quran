import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../Components/ListHeader";
import PrayerHeader from "../Components/PrayerHeader";
import SurahCard from "../Components/surahCard";
import { useSettings } from "../context/SettingsContext";
import useFetch from "../hook/useFetch";
import { fetchPrayerTimes, fetchSurahs } from "../services/api";

export default function HomeScreen() {
  const router = useRouter();
  const locationRef = useRef(null);
  const [permissionStatus, setPermissionStatus] = useState("undetermined");
  const { getColors } = useSettings();
  const colors = getColors();

  const { settings } = useSettings();
  const { data, error, loading, refetch, reset } = useFetch(() =>
    fetchSurahs({ language: settings.language })
  );

  const {
    data: prayerData,
    error: prayerError,
    loading: prayerLoading,
    refetch: refetchPrayerTimes,
    reset: resetPrayerTimes,
  } = useFetch(() => {
    if (!locationRef.current?.coords) return Promise.resolve(null);
    return fetchPrayerTimes({
      latitude: locationRef.current.coords.latitude,
      longitude: locationRef.current.coords.longitude,
    });
  });

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      locationRef.current = currentLocation;
      resetPrayerTimes();
      refetchPrayerTimes();
    } catch (error) {
      console.error("Error getting location:", error);
      setPermissionStatus("denied");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      reset();
      await refetch();
    };
    updateData();
  }, [settings]);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <PrayerHeader
        prayerData={prayerData}
        onRetry={getLocation}
        permissionStatus={permissionStatus}
      />

      {/* Ad Banner Section */}
      <View
        className="w-full h-16 items-center justify-center"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <Text style={{ color: colors.secondaryText }}>
          Advertisement Banner
        </Text>
      </View>
      {/* Content Section */}
      <View className="flex-1" style={{ backgroundColor: colors.background }}>
        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text style={{ color: colors.secondaryText, fontSize: 18 }}>
              Loading Surahs...
            </Text>
          </View>
        ) : error ? (
          <View className="flex-1 items-center justify-center">
            <Text style={{ color: colors.error, fontSize: 18 }}>
              Error loading Surahs
            </Text>
          </View>
        ) : (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <FlatList
              data={data}
              renderItem={({ item }) => <SurahCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              ListHeaderComponent={ListHeader}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
