import AsyncStorage from '@react-native-async-storage/async-storage';
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

const PRAYER_TIMES_STORAGE_KEY = '@prayer_times_cache';

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
  } = useFetch(async () => {
    if (!locationRef.current?.coords) return null;

    try {
      // Try to get cached data first
      const cachedData = await AsyncStorage.getItem(PRAYER_TIMES_STORAGE_KEY);
      if (cachedData) {
        const { data: cachedPrayerData, date } = JSON.parse(cachedData);
        const today = new Date().toDateString();
        
        // If cached data is from today, use it
        if (date === today) {
          return cachedPrayerData;
        }
      }

      // If no cache or cache is old, fetch new data
      const newData = await fetchPrayerTimes({
        latitude: locationRef.current.coords.latitude,
        longitude: locationRef.current.coords.longitude,
      });

      // Cache the new data
      await AsyncStorage.setItem(PRAYER_TIMES_STORAGE_KEY, JSON.stringify({
        data: newData,
        date: new Date().toDateString()
      }));

      return newData;
    } catch (error) {
      console.error('Error handling prayer times:', error);
      throw error;
    }
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

  // Check for date change on app focus
  useEffect(() => {
    const checkDateChange = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(PRAYER_TIMES_STORAGE_KEY);
        if (cachedData) {
          const { date } = JSON.parse(cachedData);
          const today = new Date().toDateString();
          
          // If date has changed, clear cache and refetch
          if (date !== today) {
            await AsyncStorage.removeItem(PRAYER_TIMES_STORAGE_KEY);
            resetPrayerTimes();
            refetchPrayerTimes();
          }
        }
      } catch (error) {
        console.error('Error checking date change:', error);
      }
    };

    checkDateChange();
  }, []);

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
