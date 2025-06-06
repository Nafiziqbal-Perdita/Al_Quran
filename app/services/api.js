import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchSurahkey = "fetchSurah";
const fetchSurahsKey = "fetchSurahs";

export const fetchSurahs = async ({ language }) => {
  const endPoint = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${language}/index.json`;

  try {
    // Try to get cached data for this language
    const cacheKey = `${fetchSurahsKey}_${language}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData;
    }

    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error("Could Not fetch the Data");
    }

    const data = await response.json();
    // Cache the actual data, not the response object
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchSurah = async ({link }) => {
  const endPoint = link;
  try {
    // Try to get cached data for this surah and language
    const cacheKey = `${link}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData;
    }

    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error("Could Not fetch the Data");
    }

    const data = await response.json();
    // Cache the surah data
    await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchPrayerTimes = async ({ latitude, longitude }) => {
  const endPoint = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error("Could not fetch the data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
