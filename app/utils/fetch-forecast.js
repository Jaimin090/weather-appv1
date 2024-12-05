const fetchForecast = async (city) => {
    const API_KEY = "d37b64427aebac3ff30e3c6d911eac7d";        // for some reason the API key is not working when placed env.local
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
        throw new Error(error.message || 'Failed to fetch forecast data');
    }
};

export default fetchForecast;
