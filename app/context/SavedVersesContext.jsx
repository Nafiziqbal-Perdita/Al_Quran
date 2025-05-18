import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@quran_saved_verses';

const SavedVersesContext = createContext();

export const SavedVersesProvider = ({ children }) => {
    const [savedVerses, setSavedVerses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSavedVerses();
    }, []);

    const loadSavedVerses = async () => {
        try {
            const savedVersesString = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedVersesString) {
                const savedVersesArray = JSON.parse(savedVersesString);
                setSavedVerses(savedVersesArray);
            }
        } catch (error) {
            console.error('Error loading saved verses:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveVerse = async (verseData) => {
        try {
            const newSavedVerses = [...savedVerses, verseData];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedVerses));
            setSavedVerses(newSavedVerses);
        } catch (error) {
            console.error('Error saving verse:', error);
            throw error;
        }
    };

    const removeVerse = async (surahId, verseId) => {
        try {
            const newSavedVerses = savedVerses.filter(
                v => !(v.surahId === surahId && v.verseId === verseId)
            );
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSavedVerses));
            setSavedVerses(newSavedVerses);
        } catch (error) {
            console.error('Error removing verse:', error);
            throw error;
        }
    };

    const isVerseSaved = (surahId, verseId) => {
        return savedVerses.some(v => v.surahId === surahId && v.verseId === verseId);
    };

    return (
        <SavedVersesContext.Provider
            value={{
                savedVerses,
                loading,
                saveVerse,
                removeVerse,
                isVerseSaved,
                refreshSavedVerses: loadSavedVerses
            }}
        >
            {children}
        </SavedVersesContext.Provider>
    );
};

export const useSavedVerses = () => {
    const context = useContext(SavedVersesContext);
    if (!context) {
        throw new Error('useSavedVerses must be used within a SavedVersesProvider');
    }
    return context;
}; 