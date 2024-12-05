"use client";

import { useState } from 'react';
import WeatherCard from '../app/components/weather-card';
// import Forecast from '../components/Forecast';
// import AQICard from '../components/AQICard';
import fetchWeather from '../app/utils/fetch-weather';
// import fetchForecast from '../utils/fetchForecast';
// import fetchWeatherByCoords from '../utils/fetchWeatherByCoords';
// import fetchForecastByCoords from '../utils/fetchForecastByCoords';
// import fetchAQI from '../utils/fetchAQI';

const Home = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    // const [forecastData, setForecastData] = useState(null);
    // const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState('');

    // const handleGeolocation = async () => {
    //     setError('');
    //     try {
    //         navigator.geolocation.getCurrentPosition(async (position) => {
    //             const { latitude, longitude } = position.coords;

    //             const weather = await fetchWeatherByCoords(latitude, longitude);
    //             const forecast = await fetchForecastByCoords(latitude, longitude);
    //             // const aqi = await fetchAQI(latitude, longitude);

    //             setWeatherData(weather);
    //             setForecastData(forecast);
    //             // setAqiData(aqi);
    //         }, () => {
    //             setError('Unable to retrieve location.');
    //         });
    //     } catch (err) {
    //         setError('Error fetching data for your location.');
    //     }
    // };

    const handleSearch = async () => {
        setError('');
        try {
            const weather = await fetchWeather(city);
            // const forecast = await fetchForecast(city);
            // const { coord } = weather;
            // const aqi = await fetchAQI(coord.lat, coord.lon);

            setWeatherData(weather);
            // setForecastData(forecast);
            // setAqiData(aqi);
        } catch (err) {
            setError('City not found. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-5xl font-bold mb-6 text-center">Weather App</h1>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="px-4 py-2 rounded-md shadow-lg text-black w-full sm:w-64"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                >
                    Search
                </button>
                <button
                    onClick={handleGeolocation}
                    className="px-6 py-2 bg-slate-600 rounded-lg shadow-md hover:bg-slate-700"
                >
                    Use My Location
                </button>
            </div>
            {error && <p className="text-red-500 text-lg mb-4">{error}</p>}
            <WeatherCard weatherData={weatherData} />
            {/* {aqiData && <AQICard aqiData={aqiData} />} */}
            {/* <Forecast forecastData={forecastData} /> */}
        </div>
    );
};

export default Home;
