import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../Components/Loading';
import { useSavedVerses } from '../context/SavedVersesContext';
import { useSettings } from '../context/SettingsContext';
import useFetch from '../hook/useFetch';
import { fetchSurah } from '../services/api';

const BISMILLAH = {
    text: 'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful.'
};

const SurahDetails = () => {
    const { id: rawId } = useLocalSearchParams();
    const id = String(rawId || '');
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
    } = useFetch(() => fetchSurah({ link:id }));

    const toggleSaveVerse = async (verseId, verseText, verseTranslation) => {
        if (!data) return;
        try {
            if (isVerseSaved(id, verseId)) {
                await removeVerse(id, verseId);
            } else {
                await saveVerse({
                    verseId,
                    surahId: id, // FIX: always use surahId for consistency
                    surahName: data.name || '',
                    surahTranslation: data.translation || '',
                    verseText,
                    verseTranslation,
                });
            }
        } catch (error) {
            console.error('Error toggling verse:', error);
            Alert.alert('Error', 'Failed to save/remove verse');
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error || !data) {
        return (
            <SafeAreaView 
                className="flex-1 items-center justify-center px-6"
                style={{ backgroundColor: colors.background }}
            >
                <View 
                    className="w-full p-8 rounded-3xl items-center"
                    style={{ 
                        backgroundColor: colors.cardBackground,
                        shadowColor: colors.error,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 10,
                    }}
                >
                    <View 
                        className="w-16 h-16 rounded-2xl items-center justify-center mb-4"
                        style={{ backgroundColor: `${colors.error}15` }}
                    >
                        <Ionicons name="alert-circle" size={32} color={colors.error} />
                    </View>
                    <Text 
                        className="text-lg font-bold mb-2"
                        style={{ color: colors.error }}
                    >
                        Error Loading Surah
                    </Text>
                    <Text
                        className="text-sm text-center"
                        style={{ color: colors.secondaryText }}
                    >
                        Please check your connection and try again
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    const renderVerse = ({ item, index }) => (
        <View className="flex-row items-start mb-5 px-2">
            {/* Modern verse number badge with accent border and shadow */}
            <View
                className="w-10 h-10 rounded-full border-2 items-center justify-center mt-2 mr-4 shadow-sm"
                style={{
                    borderColor: colors.accent,
                    backgroundColor: colors.background,
                    shadowColor: colors.buttonPrimary,
                    elevation: 2,
                }}
            >
                <Text className="text-base" style={{ color: colors.accent, fontWeight: '600' }}>{item.id}</Text>
            </View>

            {/* Verse card with modern styling */}
            <View
                className="flex-1 rounded-2xl py-4 px-4 shadow"
                style={{
                    backgroundColor: colors.cardBackground,
                    shadowColor: colors.buttonPrimary,
                    elevation: 3,
                }}
            >
                <View className="flex-row justify-between items-start mb-2">
                    <TouchableOpacity
                        onPress={() => toggleSaveVerse(item.id, item.text, item.translation)}
                        className="p-1.5 rounded-xl"
                        style={{ backgroundColor: isVerseSaved(id, item.id) ? `${colors.accent}15` : 'transparent' }}
                    >
                        <Ionicons
                            name={isVerseSaved(id, item.id) ? 'bookmark' : 'bookmark-outline'}
                            size={20}
                            color={isVerseSaved(id, item.id) ? colors.accent : colors.secondaryText}
                        />
                    </TouchableOpacity>
                </View>
                {/* Arabic text (not bold) */}
                <Text
                    className="text-right mb-1"
                    style={{
                        fontSize: getFontSizeValue('arabic'),
                        color: colors.primaryText,
                        lineHeight: getFontSizeValue('arabic') * 2,
                    }}
                >
                    {item.text}
                </Text>
                {/* Transliteration */}
                {item.transliteration && (
                    <Text
                        className="text-right italic text-accent opacity-85 mb-1"
                        style={{
                            fontSize: getFontSizeValue('translation'),
                            color: colors.accent,
                        }}
                    >
                        {item.transliteration}
                    </Text>
                )}
                {/* Divider */}
                <View className="h-px my-2 rounded-full" style={{ backgroundColor: `${colors.buttonPrimary}10` }} />
                {/* Translation */}
                <Text
                    className="text-left"
                    style={{
                        fontSize: getFontSizeValue('translation'),
                        color: colors.secondaryText,
                        lineHeight: getFontSizeValue('translation') * 1.6,
                    }}
                >
                    {item.translation}
                </Text>
            </View>
        </View>
    );

    const SurahHeader = () => (
        <View
            className="mb-8 mx-2 mt-2 rounded-3xl shadow-lg overflow-hidden"
            style={{
                backgroundColor: colors.cardBackground,
                shadowColor: colors.buttonPrimary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
            }}
        >
            <View 
                className="px-6 pt-8 pb-10 items-center"
                style={{
                    backgroundColor: `${colors.buttonPrimary}08`,
                }}
            >
              

                <Text 
                    className="text-4xl font-bold mb-4"
                    style={{ 
                        color: colors.primaryText,
                        fontSize: getFontSizeValue('title'),
                        textShadowColor: 'rgba(0, 0, 0, 0.1)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    }}
                >
                    {data.name || ''}
                </Text>

                <View 
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ backgroundColor: colors.accent }}
                />

                <Text 
                    className="text-xl font-semibold mb-2"
                    style={{ 
                        color: colors.primaryText,
                        fontSize: getFontSizeValue('title'),
                    }}
                >
                    {data.translation || ''}
                </Text>

                <Text 
                    className="text-base text-center opacity-80"
                    style={{ 
                        color: colors.secondaryText,
                        fontSize: getFontSizeValue('translation'),
                    }}
                >
                    {`${data.total_verses || 0} Verses${data.revelation_type ? ` • ${data.revelation_type}` : ''}`}
                </Text>
            </View>

            {/* Bismillah Section */}
            {id !== '1' && id !== '9' && (
                <View className="px-6 py-8 items-center">
                    <Text
                        className="text-3xl mb-3"
                        style={{ 
                            color: colors.primaryText,
                            fontSize: getFontSizeValue('arabic'),
                            textAlign: 'center',
                        }}
                    >
                        {BISMILLAH.text}
                    </Text>
                    <Text
                        className="text-sm text-center opacity-80"
                        style={{ 
                            color: colors.secondaryText,
                            fontSize: getFontSizeValue('translation'),
                        }}
                    >
                        {BISMILLAH.translation}
                    </Text>
                </View>
            )}
        </View>
    );

    return (
        <SafeAreaView 
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            {/* Watermark background for elegance */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: 0 }} pointerEvents="none">
                <Text style={{
                    fontSize: 180,
                    color: colors.buttonPrimary,
                    opacity: 0.04,
                    fontWeight: 'bold',
                    marginTop: 40,
                }}>﷽</Text>
            </View>
            <FlatList
                data={Array.isArray(data?.verses) ? data.verses : []}
                renderItem={renderVerse}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                contentContainerStyle={{ 
                    padding: 16, 
                    paddingBottom: 32,
                    zIndex: 1,
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<SurahHeader />}
                style={{ zIndex: 1 }}
            />
        </SafeAreaView>
    );
};

export default SurahDetails;