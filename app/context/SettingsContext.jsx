import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@quran_settings';

const SettingsContext = createContext();

// Premium color palette aligned with 2025 design trends
const COLORS = {
  light: {
    background: '#F7F9FC',          // Softer, premium background
    primaryText: '#1A202C',         // Rich dark text
    secondaryText: '#4A5568',       // Balanced secondary
    accent: '#4A90E2',              // Professional blue accent
    buttonPrimary: '#667EEA',       // Premium gradient start
    buttonSecondary: '#E6FFFA',     // Subtle secondary
    buttonText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardShadow: 'rgba(70, 144, 226, 0.1)', // Accent-based shadows
    divider: 'rgba(255, 255, 255, 0.15)',
    headerBg: '#F7F9FC',
    highlightBg: 'rgba(70, 144, 226, 0.1)',
    error: '#EF4444',              // Modern red
    success: '#10B981',            // Modern green
    arabicText: '#4A90E2',         // Accent color for Arabic
    verseNumber: '#8B5CF6',        // Purple accent
    prayerTime: '#34D399'          // Success green
  },
  dark: {
    background: '#0F0F0F',          // Rich dark background
    primaryText: '#FFFFFF',         // Pure white text for maximum contrast
    secondaryText: '#B0B0B0',       // Lighter gray for better visibility
    accent: '#70A5FA',              // Brighter blue for better contrast
    buttonPrimary: '#8B70FA',       // Brighter purple for visibility
    buttonSecondary: '#1A1A1A',     // Dark secondary
    buttonText: '#FFFFFF',
    cardBackground: '#1E1E1E',      // Slightly lighter card background
    cardShadow: 'rgba(112, 165, 250, 0.2)', // Brighter accent shadows
    divider: 'rgba(255, 255, 255, 0.15)',
    headerBg: '#0F0F0F',
    highlightBg: 'rgba(112, 165, 250, 0.2)',
    error: '#FF6B6B',              // Brighter red for visibility
    success: '#51CF66',            // Brighter green
    arabicText: '#A78BFA',         // Brighter purple for Arabic
    verseNumber: '#F472B6',        // Bright pink accent
    prayerTime: '#51CF66'          // Bright success green
  }
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        language: 'bn',
        fontSize: 'Medium',
        darkMode: false
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            const updatedSettings = { ...settings, ...newSettings };
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
            setSettings(updatedSettings);
        } catch (error) {
            console.error('Error saving settings:', error);
            throw error;
        }
    };

    const getFontSizeValue = (type = 'translation') => {
        const baseSize = (() => {
            switch (settings.fontSize) {
                case 'Small':
                    return 14;
                case 'Medium':
                    return 16;
                case 'Large':
                    return 18;
                default:
                    return 16;
            }
        })();

        // Adjust size based on content type
        switch (type) {
            case 'arabic':
                return baseSize + 8; // Arabic text is larger
            case 'title':
                return baseSize + 4; // Titles are slightly larger
            case 'translation':
            default:
                return baseSize;
        }
    };

    const getLanguageCode = () => {
        return settings.language;
    };

    const isDarkMode = () => {
        return settings.darkMode;
    };

    const getColors = () => {
        return settings.darkMode ? COLORS.dark : COLORS.light;
    };

    return (
        <SettingsContext.Provider
            value={{
                settings,
                loading,
                updateSettings,
                getFontSizeValue,
                getLanguageCode,
                getColors
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export default SettingsProvider;