import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedVerses } from '../context/SavedVersesContext';
import { useSettings } from '../context/SettingsContext';
import useFetch from '../hook/useFetch';
import { fetchSurah } from '../services/api';

const BISMILLAH = {
    text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful.'
};

const SurahDetails = () => {
    const { id } = useLocalSearchParams();
    const { isVerseSaved, saveVerse, removeVerse } = useSavedVerses();
    const { 
        getFontSizeValue,
        getLanguageCode,
        getColors
    } = useSettings();
    const colors = getColors();

    const {
        data,
        error,
        loading
    } = useFetch(() => fetchSurah({ id, language: getLanguageCode() }));

    const toggleSaveVerse = async (verseId, verseText, verseTranslation) => {
        try {
            if (isVerseSaved(id, verseId)) {
                await removeVerse(id, verseId);
            } else {
                await saveVerse({
                    verseId,
                    surahId: id,
                    surahName: data.name,
                    surahTranslation: data.translation,
                    verseText,
                    verseTranslation
                });
            }
        } catch (error) {
            console.error('Error toggling verse:', error);
            Alert.alert('Error', 'Failed to save/remove verse');
        }
    };

    if (loading) {
        return (
            <SafeAreaView 
                className="flex-1 items-center justify-center"
                style={{ backgroundColor: colors.background }}
            >
                <Text 
                    className="text-lg"
                    style={{ color: colors.secondaryText }}
                >
                    Loading Surah...
                </Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView 
                className="flex-1 items-center justify-center"
                style={{ backgroundColor: colors.background }}
            >
                <Text 
                    className="text-lg"
                    style={{ color: colors.error }}
                >
                    Error loading Surah
                </Text>
            </SafeAreaView>
        );
    }

    const renderVerse = ({ item }) => (
        <View className="flex-row items-start mb-6 px-2 shadow-lg">
            {/* Verse number circle */}
            <View 
                className="w-8 h-8 rounded-full items-center justify-center mt-1 mr-3"
                style={{ backgroundColor: colors.accent }}
            >
                <Text 
                    className="font-bold"
                    style={{ color: colors.buttonText }}
                >
                    {item.id}
                </Text>
            </View>
            {/* Verse content stacked vertically */}
            <View 
                className="flex-1 rounded-lg p-4"
                style={{ backgroundColor: colors.cardBackground }}
            >
                <View className="flex-row justify-between items-start mb-2">
                    <TouchableOpacity 
                        onPress={() => toggleSaveVerse(item.id, item.text, item.translation)}
                        className="p-1"
                    >
                        <Ionicons 
                            name={isVerseSaved(id, item.id) ? "bookmark" : "bookmark-outline"} 
                            size={24} 
                            color={isVerseSaved(id, item.id) ? colors.accent : colors.secondaryText}
                        />
                    </TouchableOpacity>
                    <Text
                        className="text-4xl flex-1"
                        style={{ 
                            textAlign: 'right',
                            fontSize: getFontSizeValue('arabic'),
                            color: colors.primaryText
                        }}
                    >
                        {item.text}
                    </Text>
                </View>
                <Text
                    className="text-base"
                    style={{ 
                        textAlign: 'left',
                        fontSize: getFontSizeValue('translation'),
                        color: colors.secondaryText
                    }}
                >
                    {item.translation}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView 
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            <View style={{ backgroundColor: colors.background }}>
                <FlatList
                    data={data?.verses || []}
                    renderItem={renderVerse}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        data ? (
                            <View
                                className="mb-6 mx-2 mt-2 rounded-2xl shadow-lg"
                                style={{
                                    backgroundColor: colors.cardBackground,
                                    elevation: 4,
                                    shadowColor: colors.accent,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.15,
                                    shadowRadius: 6,
                                    padding: 20,
                                    alignItems: 'center',
                                }}
                            >
                                {/* Surah Name and Info */}
                                <Text 
                                    className="text-4xl font-extrabold tracking-wide"
                                    style={{ 
                                        color: colors.accent,
                                        fontSize: getFontSizeValue('title')
                                    }}
                                >
                                    {data.name || ''}
                                </Text>
                                <View
                                    style={{
                                        width: 48,
                                        height: 4,
                                        backgroundColor: colors.accent,
                                        borderRadius: 2,
                                        marginVertical: 10,
                                    }}
                                />
                                <Text 
                                    className="text-xl font-semibold mb-1"
                                    style={{ 
                                        color: colors.primaryText,
                                        fontSize: getFontSizeValue('title')
                                    }}
                                >
                                    {data.translation || ''}
                                </Text>
                                <Text 
                                    className="text-base"
                                    style={{ 
                                        color: colors.secondaryText,
                                        fontSize: getFontSizeValue('translation')
                                    }}
                                >
                                    {data.total_verses ? `${data.total_verses} Verses` : ''}
                                </Text>

                                {/* Bismillah Section */}
                                <Text 
                                    className="text-5xl font-extrabold text-center mb-2" 
                                    style={{ 
                                        lineHeight: 54,
                                        color: colors.accent,
                                        fontSize: getFontSizeValue('arabic')
                                    }}
                                >
                                    {BISMILLAH.text}
                                </Text>
                                <Text 
                                    className="text-base text-center mb-4"
                                    style={{ 
                                        color: colors.secondaryText,
                                        fontSize: getFontSizeValue('translation')
                                    }}
                                >
                                    {BISMILLAH.translation}
                                </Text>
                            </View>
                        ) : null
                    }
                />
            </View>
        </SafeAreaView>
    );
}

export default SurahDetails;