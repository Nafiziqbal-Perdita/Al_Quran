import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
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
        <View className="mb-4">
            <TouchableOpacity 
                onPress={() => toggleSection(sectionKey)}
                className="flex-row items-center justify-between p-4 rounded-lg shadow-sm"
                style={{ backgroundColor: colors.cardBackground }}
            >
                <View className="flex-row items-center">
                    <Text 
                        className="text-lg font-semibold"
                        style={{ color: colors.accent }}
                    >
                        {title}
                    </Text>
                    <Text 
                        className="text-base ml-2"
                        style={{ color: colors.secondaryText }}
                    >
                        ({isLanguage ? getLanguageName(selected) : selected})
                    </Text>
                </View>
                <Ionicons 
                    name={expandedSections[sectionKey] ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color={colors.accent}
                />
            </TouchableOpacity>
            
            {expandedSections[sectionKey] && (
                <View 
                    className="mt-2 rounded-lg shadow-sm overflow-hidden"
                    style={{ backgroundColor: colors.cardBackground }}
                >
                    {options.map((option) => (
                        <TouchableOpacity
                            key={isLanguage ? option.code : option}
                            onPress={() => {
                                onSelect(isLanguage ? option.code : option);
                                toggleSection(sectionKey);
                            }}
                            className="flex-row items-center justify-between p-4 border-b"
                            style={{ borderBottomColor: colors.divider }}
                        >
                            <Text 
                                className="text-base"
                                style={{ color: colors.primaryText }}
                            >
                                {isLanguage ? option.name : option}
                            </Text>
                            {selected === (isLanguage ? option.code : option) && (
                                <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
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
                className="text-lg font-semibold mb-3"
                style={{ color: colors.accent }}
            >
                Appearance
            </Text>
            <View 
                className="rounded-2xl p-5 shadow-sm"
                style={{ 
                    backgroundColor: colors.cardBackground,
                    shadowColor: colors.cardShadow,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                    borderWidth: 1,
                    borderColor: colors.divider,
                }}
            >
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <View 
                            className="w-10 h-10 rounded-full items-center justify-center mr-3"
                            style={{ backgroundColor: settings.darkMode ? colors.buttonPrimary : `${colors.buttonPrimary}20` }}
                        >
                            <Ionicons 
                                name={settings.darkMode ? "moon" : "sunny"} 
                                size={22} 
                                color={settings.darkMode ? colors.buttonText : colors.buttonPrimary} 
                            />
                        </View>
                        <View>
                            <Text 
                                className="text-base font-medium"
                                style={{ color: colors.primaryText }}
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
                        trackColor={{ false: colors.divider, true: `${colors.buttonPrimary}80` }}
                        thumbColor={settings.darkMode ? colors.buttonPrimary : colors.buttonText}
                        ios_backgroundColor={colors.divider}
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