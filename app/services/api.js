export const fetchSurahs = async ({language}) => {
  const endPoint = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${language}/index.json`;

  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error('Could Not fetch the Data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    throw error;
  }
}

export const fetchSurah = async ({id,language}) => {
  const endPoint = `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/${language}/${id}.json`;

  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error('Could Not fetch the Data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    throw error;
  }
}


export const fetchPrayerTimes = async ({ latitude, longitude }) => {
  const endPoint = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error('Could not fetch the data');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    throw error;
  }
};
