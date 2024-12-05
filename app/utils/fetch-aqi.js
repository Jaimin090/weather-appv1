const fetchAQI = async (lat, lon) => {
    const API_KEY = "d37b64427aebac3ff30e3c6d911eac7d";  
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch AQI data');
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch AQI data');
        } else {
            throw new Error('Failed to fetch AQI data');
        }
    }
};

export default fetchAQI;
