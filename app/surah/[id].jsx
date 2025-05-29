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
    } = useFetch(() => fetchSurah({ id, language: getLanguageCode() }));

    const toggleSaveVerse = async (verseId, verseText, verseTranslation) => {
        if (!data) return;
        try {
            if (isVerseSaved(id, verseId)) {
                await removeVerse(id, verseId);
            } else {
                await saveVerse({
                    verseId,
                    surahId: id,
                    surahName: data.name || '',
                    surahTranslation: data.translation || '',
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
        <View 
            className="flex-row items-start mb-4 px-2"
            style={{ 
                opacity: 1,
                transform: [{ scale: 1 }],
            }}
        >
            <View 
                className="w-10 h-10 rounded-xl items-center justify-center mt-1 mr-3"
                style={{ 
                    backgroundColor: `${colors.buttonPrimary}15`,
                }}
            >
                <Text 
                    className="font-bold text-lg"
                    style={{ color: colors.buttonPrimary }}
                >
                    {item.id}
                </Text>
            </View>

            <View 
                className="flex-1 rounded-2xl p-5"
                style={{ 
                    backgroundColor: colors.cardBackground,
                    shadowColor: colors.buttonPrimary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 3,
                }}
            >
                <View className="flex-row justify-between items-start mb-4">
                    <TouchableOpacity 
                        onPress={() => toggleSaveVerse(item.id, item.text, item.translation)}
                        className="p-2 rounded-xl"
                        style={{ 
                            backgroundColor: isVerseSaved(id, item.id) 
                                ? `${colors.accent}15` 
                                : 'transparent'
                        }}
                    >
                        <Ionicons 
                            name={isVerseSaved(id, item.id) ? "bookmark" : "bookmark-outline"} 
                            size={24} 
                            color={isVerseSaved(id, item.id) ? colors.accent : colors.secondaryText}
                        />
                    </TouchableOpacity>

                    <Text
                        className="flex-1 ml-4"
                        style={{ 
                            textAlign: 'right',
                            fontSize: getFontSizeValue('arabic'),
                            color: colors.primaryText,
                            lineHeight: getFontSizeValue('arabic') * 2,
                        }}
                    >
                        {item.text}
                    </Text>
                </View>

                <View 
                    className="h-[1px] my-4 rounded-full"
                    style={{ backgroundColor: `${colors.buttonPrimary}10` }}
                />

                <Text
                    style={{ 
                        textAlign: 'left',
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
                <View 
                    className="w-16 h-16 rounded-2xl items-center justify-center mb-6"
                    style={{ backgroundColor: `${colors.buttonPrimary}15` }}
                >
                    <Text 
                        className="text-2xl font-bold"
                        style={{ color: colors.buttonPrimary }}
                    >
                        {id}
                    </Text>
                </View>

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
            <FlatList
                data={Array.isArray(data?.verses) ? data.verses : []}
                renderItem={renderVerse}
                keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
                contentContainerStyle={{ 
                    padding: 16, 
                    paddingBottom: 32 
                }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<SurahHeader />}
            />
        </SafeAreaView>
    );
};

export default SurahDetails;