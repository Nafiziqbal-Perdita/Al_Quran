import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopSection from '../Components/TopSection';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
    const { 
        settings, 
        updateSettings,
        loading,
        getColors
    } = useSettings();
    const colors = getColors();

    // console.log('settings',settings);
    // Track which sections are expanded
    const [expandedSections, setExpandedSections] = useState({
        language: false,
        fontSize: false
    });

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'bn', name: 'Bengali' },
        { code: 'zh', name: 'Chinese' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'id', name: 'Indonesian' },
        { code: 'ru', name: 'Russian' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
        { code: 'ur', name: 'Urdu' }
    ];

    const fontSizes = ['Small', 'Medium', 'Large'];

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getLanguageName = (code) => {
        const language = languages.find(lang => lang.code === code);
        return language ? language.name : 'English';
    };

    const handleSettingChange = async (key, value) => {
        try {
            await updateSettings({ [key]: value });
        } catch (error) {
            console.error('Error updating setting:', error);
        }
    };

    const renderSection = (title, options, selected, onSelect, sectionKey, isLanguage = false) => (
        <View className="mb-5">
            <TouchableOpacity 
                onPress={() => toggleSection(sectionKey)}
                className="flex-row items-center justify-between p-5 rounded-2xl shadow-sm"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  shadowColor: colors.accent,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 8,
                }}
            >
                {/* Glassmorphic background */}
                <View 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    backgroundColor: colors.cardBackground,
                    opacity: 0.9,
                  }}
                />
                
                <View className="flex-row items-center relative z-10">
                    <View 
                        className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
                        style={{ 
                          backgroundColor: `${colors.accent}15`,
                          borderWidth: 1,
                          borderColor: `${colors.accent}25`,
                        }}
                    >
                        <Ionicons 
                            name={sectionKey === 'language' ? 'language' : 'text'} 
                            size={20} 
                            color={colors.accent} 
                        />
                    </View>
                    <View>
                        <Text 
                            className="text-lg font-semibold"
                            style={{ 
                              color: colors.accent,
                              textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                              textShadowOffset: { width: 0, height: 1 },
                              textShadowRadius: 2,
                              fontWeight: '600',
                            }}
                        >
                            {title}
                        </Text>
                        <Text 
                            className="text-sm"
                            style={{ 
                                color: colors.secondaryText,
                                fontWeight: '400',
                            }}
                        >
                            ({isLanguage ? getLanguageName(selected) : selected})
                        </Text>
                    </View>
                </View>
                <Ionicons 
                    name={expandedSections[sectionKey] ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color={colors.accent}
                    style={{ zIndex: 10 }}
                />
            </TouchableOpacity>
            
            {expandedSections[sectionKey] && (
                <View 
                    className="mt-3 rounded-2xl shadow-sm overflow-hidden"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* Glassmorphic background */}
                    <View 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        backgroundColor: colors.cardBackground,
                        opacity: 0.8,
                      }}
                    />
                    
                    {options.map((option, index) => (
                        <TouchableOpacity
                            key={isLanguage ? option.code : option}
                            onPress={() => {
                                onSelect(isLanguage ? option.code : option);
                                toggleSection(sectionKey);
                            }}
                            className="flex-row items-center justify-between p-4"
                            style={{ 
                              borderBottomColor: colors.divider,
                              borderBottomWidth: index < options.length - 1 ? 1 : 0,
                              backgroundColor: selected === (isLanguage ? option.code : option) ? `${colors.accent}10` : 'transparent',
                            }}
                        >
                            <Text 
                                className="text-base font-medium"
                                style={{ 
                                  color: colors.primaryText,
                                  opacity: selected === (isLanguage ? option.code : option) ? 1 : 0.8,
                                }}
                            >
                                {isLanguage ? option.name : option}
                            </Text>
                            {selected === (isLanguage ? option.code : option) && (
                                <View 
                                  className="w-6 h-6 rounded-full items-center justify-center"
                                  style={{ backgroundColor: colors.accent }}
                                >
                                  <Ionicons name="checkmark" size={16} color={colors.buttonText} />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );

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
                    Loading settings...
                </Text>
            </SafeAreaView>
        );
    }

    // Dark Mode Toggle Section
    const renderDarkModeToggle = () => (
        <View className="mb-6">
            <Text 
                className="text-xl font-semibold mb-4"
                style={{ 
                  color: colors.accent,
                  textShadowColor: colors.primaryText === '#F7FAFC' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 2,
                  fontWeight: '600',
                }}
            >
                Appearance
            </Text>
            <View 
                className="rounded-3xl p-6 shadow-2xl"
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(30px)',
                    shadowColor: colors.accent,
                    shadowOffset: { width: 0, height: 12 },
                    shadowOpacity: 0.25,
                    shadowRadius: 20,
                    elevation: 15,
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                }}
            >
                {/* Glassmorphic background */}
                <View 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    backgroundColor: colors.cardBackground,
                    opacity: 0.9,
                  }}
                />
                
                <View className="flex-row items-center justify-between relative z-10">
                    <View className="flex-row items-center">
                        <View 
                            className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                            style={{ 
                              backgroundColor: settings.darkMode 
                                ? `${colors.buttonPrimary}20` 
                                : `${colors.buttonPrimary}15`,
                              borderWidth: 2,
                              borderColor: settings.darkMode 
                                ? `${colors.buttonPrimary}40` 
                                : `${colors.buttonPrimary}25`,
                              shadowColor: colors.buttonPrimary,
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.15,
                              shadowRadius: 8,
                              elevation: 4,
                            }}
                        >
                            <Ionicons 
                                name={settings.darkMode ? "moon" : "sunny"} 
                                size={26} 
                                color={colors.buttonPrimary} 
                            />
                        </View>
                        <View>
                            <Text 
                                className="text-lg font-bold"
                                style={{ 
                                  color: colors.primaryText,
                                  textShadowColor: 'rgba(0, 0, 0, 0.1)',
                                  textShadowOffset: { width: 0, height: 1 },
                                  textShadowRadius: 2,
                                }}
                            >
                                Dark Mode
                            </Text>
                            <Text 
                                className="text-sm"
                                style={{ color: colors.secondaryText }}
                            >
                                {settings.darkMode ? "Currently enabled" : "Currently disabled"}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={settings.darkMode}
                        onValueChange={(value) => handleSettingChange('darkMode', value)}
                        trackColor={{ false: colors.divider, true: `${colors.buttonPrimary}60` }}
                        thumbColor={settings.darkMode ? colors.buttonPrimary : colors.buttonText}
                        ios_backgroundColor={colors.divider}
                        style={{
                          transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
                          shadowColor: colors.buttonPrimary,
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          elevation: 3,
                        }}
                    />
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView 
            className="flex-1"
            style={{ backgroundColor: colors.background }}
        >
            {/* Header Section */}
            <View 
                className="h-auto mt-2 mb-2 rounded-b-3xl pb-4"
                style={{ backgroundColor: colors.background }}
            >
                <TopSection />
            </View>

            {/* Ad Banner Section */}
            <View 
                className="w-full h-16 items-center justify-center mb-2"
                style={{ 
                    backgroundColor: colors.cardBackground,
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: colors.divider,
                }}
            >
                <Text style={{ color: colors.secondaryText }}>Advertisement Banner</Text>
            </View>

            <ScrollView className="flex-1 px-4 py-2">
                {/* Dark Mode Toggle - Moved to top for prominence */}
                {renderDarkModeToggle()}
                
                {/* Language Selection */}
                {renderSection(
                    'Language', 
                    languages, 
                    settings.language, 
                    (value) => handleSettingChange('language', value), 
                    'language', 
                    true
                )}

                {/* Font Size Selection */}
                {renderSection(
                    'Font Size', 
                    fontSizes, 
                    settings.fontSize, 
                    (value) => handleSettingChange('fontSize', value), 
                    'fontSize'
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;