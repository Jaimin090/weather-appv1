const fetchWeather = async (city) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Failed to fetch weather data');
        } else {
            throw new Error('Failed to fetch weather data');
        }
    }
};

export default fetchWeather;
