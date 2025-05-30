import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@quran_settings';

const SettingsContext = createContext();

// Color palette
const COLORS = {
  light: {
    background: '#F8F9FA',
    primaryText: '#1A1A2E',
    secondaryText: '#4A5568',
    accent: '#26A69A',        // Teal accent
    buttonPrimary: '#1E88E5',  // Blue primary
    buttonSecondary: '#E0F2F1',
    buttonText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.08)',
    divider: '#E2E8F0',
    headerBg: '#F8F9FA',
    highlightBg: '#E3F2FD',    // Light blue highlight
    error: '#E53935',
    success: '#43A047',
    arabicText: '#16697A',     // Special color for Arabic text
    verseNumber: '#64B5F6',    // Verse number background
    prayerTime: '#81C784'      // Prayer time highlight
  },
  dark: {
    background: '#121212',
    primaryText: '#E4E6EB',
    secondaryText: '#B0B3B8',
    accent: '#4DB6AC',         // Lighter teal for dark mode
    buttonPrimary: '#2196F3',  // Brighter blue for dark mode
    buttonSecondary: '#263238',
    buttonText: '#FFFFFF',
    cardBackground: '#1E1E1E',
    cardShadow: 'rgba(0, 0, 0, 0.2)',
    divider: '#2D2D2D',
    headerBg: '#121212',
    highlightBg: '#0D47A1',    // Darker blue highlight
    error: '#EF5350',
    success: '#66BB6A',
    arabicText: '#80CBC4',     // Lighter teal for Arabic in dark mode
    verseNumber: '#1976D2',    // Darker verse number background
    prayerTime: '#388E3C'      // Darker prayer time highlight
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