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
        <View className="flex-row items-start mb-8 px-3">
            {/* Premium verse number badge with advanced glassmorphism */}
            <View
                className="w-14 h-14 rounded-2xl items-center justify-center mt-3 mr-5 shadow-lg"
                style={{
                    background: 'linear-gradient(135deg, rgba(70, 144, 226, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%)',
                    backgroundColor: `${colors.accent}12`,
                    borderWidth: 2.5,
                    borderColor: `${colors.accent}25`,
                    shadowColor: colors.accent,
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.25,
                    shadowRadius: 12,
                    elevation: 8,
                }}
            >
                <Text 
                    className="text-lg font-bold" 
                    style={{ 
                        color: colors.accent, 
                        fontWeight: '700',
                        textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.4)' : `${colors.accent}30`,
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 2,
                    }}
                >
                    {item.id}
                </Text>
            </View>

            {/* Verse card with premium glassmorphic styling */}
            <View
                className="flex-1 rounded-3xl py-6 px-6 shadow-2xl"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    backdropFilter: 'blur(30px)',
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    shadowColor: colors.accent,
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.2,
                    shadowRadius: 25,
                    elevation: 16,
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
                
                {/* Premium gradient accent border with animation effect */}
                <View 
                  className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                  style={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
                    backgroundColor: colors.accent,
                    opacity: 0.6,
                  }}
                />
                
                {/* Inner highlight for premium depth */}
                <View 
                  className="absolute inset-1 rounded-3xl"
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                />
                
                <View className="relative z-10">
                    <View className="flex-row justify-between items-start mb-4">
                        <TouchableOpacity
                            onPress={() => toggleSaveVerse(item.id, item.text, item.translation)}
                            className="p-3 rounded-2xl"
                            style={{ 
                              background: isVerseSaved(id, item.id) 
                                ? 'linear-gradient(135deg, rgba(70, 144, 226, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)'
                                : 'transparent',
                              backgroundColor: isVerseSaved(id, item.id) 
                                ? `${colors.accent}15` 
                                : 'transparent',
                              borderWidth: 1.5,
                              borderColor: isVerseSaved(id, item.id) 
                                ? `${colors.accent}30` 
                                : 'rgba(255, 255, 255, 0.1)',
                              shadowColor: colors.accent,
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: isVerseSaved(id, item.id) ? 0.25 : 0,
                              shadowRadius: 8,
                              elevation: isVerseSaved(id, item.id) ? 6 : 0,
                            }}
                        >
                            <Ionicons
                                name={isVerseSaved(id, item.id) ? 'bookmark' : 'bookmark-outline'}
                                size={24}
                                color={isVerseSaved(id, item.id) ? colors.accent : colors.secondaryText}
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Arabic text with premium typography */}
                    <Text
                        className="text-right mb-4"
                        style={{
                            fontSize: getFontSizeValue('arabic'),
                            color: colors.primaryText,
                            lineHeight: getFontSizeValue('arabic') * 2.2,
                            textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.15)',
                            textShadowOffset: { width: 0, height: 2 },
                            textShadowRadius: 3,
                            fontWeight: '500',
                            letterSpacing: 0.3,
                        }}
                    >
                        {item.text}
                    </Text>
                    
                    {/* Transliteration with glassmorphic background */}
                    {item.transliteration && (
                        <View 
                            className="mb-3 p-3 rounded-xl"
                            style={{ 
                              backgroundColor: `${colors.accent}08`,
                              borderWidth: 1,
                              borderColor: `${colors.accent}15`,
                            }}
                        >
                            <Text
                                className="text-right italic"
                                style={{
                                    fontSize: getFontSizeValue('translation'),
                                    color: colors.accent,
                                    opacity: 0.9,
                                }}
                            >
                                {item.transliteration}
                            </Text>
                        </View>
                    )}
                    
                    {/* Enhanced divider */}
                    <View 
                        className="h-0.5 my-3 rounded-full" 
                        style={{ 
                          backgroundColor: `${colors.accent}20`,
                          shadowColor: colors.accent,
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 2,
                          elevation: 1,
                        }} 
                    />
                    
                    {/* Translation with glassmorphic background */}
                    <View 
                        className="p-4 rounded-2xl"
                        style={{ 
                          backgroundColor: `${colors.highlightBg || colors.buttonPrimary}06`,
                          borderWidth: 1,
                          borderColor: `${colors.highlightBg || colors.buttonPrimary}12`,
                        }}
                    >
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
            {/* Premium watermark background with enhanced glow */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: 0 }} pointerEvents="none">
                <Text style={{
                    fontSize: 220,
                    color: colors.buttonPrimary,
                    opacity: colors.primaryText === '#FFFFFF' ? 0.05 : 0.03,
                    fontWeight: '800',
                    marginTop: 60,
                    textShadowColor: colors.buttonPrimary,
                    textShadowOffset: { width: 0, height: 4 },
                    textShadowRadius: 8,
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