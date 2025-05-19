import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import TopSection from "../Components/TopSection";
import { useSavedVerses } from "../context/SavedVersesContext";
import { useSettings } from "../context/SettingsContext";
import { SafeAreaView } from "react-native-safe-area-context";

const SavedVerses = () => {
  const router = useRouter();
  const { savedVerses, removeVerse } = useSavedVerses();
  const { getColors } = useSettings();
  const colors = getColors();

  const handleRemoveVerse = async (surahId, verseId) => {
    try {
      await removeVerse(surahId, verseId);
    } catch (error) {
      console.error("Error removing verse:", error);
      Alert.alert("Error", "Failed to remove verse");
    }
  };

  const renderVerse = ({ item }) => (
    <View 
      className="rounded-lg p-4 mb-4 mx-4"
      style={{ 
        backgroundColor: colors.cardBackground,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex flex-col">
          <Text 
            className="text-lg font-semibold"
            style={{ color: colors.accent }}
          >
            {item.surahName} - Verse {item.verseId}
          </Text>
          <Text 
            className="text-sm mb-2"
            style={{ color: colors.secondaryText }}
          >
            {item.surahTranslation}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveVerse(item.surahId, item.verseId)}
          className="p-2"
        >
          <Ionicons name="trash-outline" size={24} color={colors.secondaryText} />
        </TouchableOpacity>
      </View>
      <Text
        className="text-2xl mb-2 text-right"
        style={{ 
          fontFamily: "sans-serif",
          color: colors.primaryText
        }}
      >
        {item.verseText}
      </Text>
      <Text 
        className="text-base"
        style={{ color: colors.secondaryText }}
      >
        {item.verseTranslation}
      </Text>
      <TouchableOpacity
        onPress={() => router.push(`/surah/${item.surahId}`)}
        className="mt-3 flex-row items-center"
      >
        <Text 
          className="mr-1"
          style={{ color: colors.accent }}
        >
          View in Surah
        </Text>
        <Ionicons name="arrow-forward" size={16} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View 
        className="h-auto mt-2 mb-2 rounded-b-3xl pb-4"
        style={{ backgroundColor: colors.headerBg }}
      >
        <TopSection />
      </View>

      {/* Ad Banner Section */}
      <View 
        className="w-full h-16 items-center justify-center"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <Text style={{ color: colors.secondaryText }}>Advertisement Banner</Text>
      </View>

      <View className="flex-1">
        {savedVerses.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="bookmark-outline" size={64} color={colors.secondaryText} />
            <Text 
              className="text-xl mt-4"
              style={{ color: colors.primaryText }}
            >
              No saved verses yet
            </Text>
            <Text 
              className="mt-2"
              style={{ color: colors.secondaryText }}
            >
              Save verses to read them later
            </Text>
          </View>
        ) : (
          <FlatList
            data={savedVerses}
            renderItem={renderVerse}
            keyExtractor={(item) => `${item.surahId}-${item.verseId}`}
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedVerses;
