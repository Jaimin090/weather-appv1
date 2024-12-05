const fetchForecastByCoords = async (lat, lon) => {
    const API_KEY = "d37b64427aebac3ff30e3c6d911eac7d"
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch forecast data by coordinates');
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch forecast data by coordinates');
        } else {
            throw new Error('Failed to fetch forecast data by coordinates');
        }
    }
};

export default fetchForecastByCoords;
