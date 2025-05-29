import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@quran_settings';

const SettingsContext = createContext();

// Color palette
const COLORS = {
  light: {
    background: '#FFFFFF',
    primaryText: '#000000',
    secondaryText: '#004E55',
    accent: '#E4AF52',
    buttonPrimary: '#09592C',
    buttonText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    divider: '#E5E7EB',
    headerBg: '#FFFFFF',
    error: '#DC2626'
  },
  dark: {
    background: '#121212',
    primaryText: '#FFFFFF',
    secondaryText: '#B3FFFFFF',
    accent: '#03DAC6',
    buttonPrimary: '#03DAC6',
    buttonText: '#000000',
    cardBackground: '#1E1E1E',
    divider: '#2C2C2C',
    headerBg: '#121212',
    error: '#CF6679'
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