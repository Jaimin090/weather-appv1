"use client";

import { useState } from 'react';
import WeatherCard from '../app/components/weather-card';
import Forecast from '../app/components/forecast-card';
// import AQICard from '../components/AQICard';
import fetchWeather from '../app/utils/fetch-weather';
import fetchForecast from '../app/utils/fetch-forecast';
import fetchWeatherByCoords from '../app/utils/fetch-weathercoords';
import fetchForecastByCoords from '../app/utils/fetch-forecastcoords';
import fetchAQI from '../app/utils/fetch-aqi';

const Home = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [aqiData, setAqiData] = useState(null);
    const [error, setError] = useState('');

    const backgroundImages = {
      Clear: '/images/clear.jpg',
      Clouds: '/images/cloud.jpg',
      Rain: '/images/rainy.jpg',
      Snow: '/images/snowy.jpg',
      Storm: '/images/storm.jpg',
      Drizzle: '/images/drizzle.jpg',
      Mist: '/images/mist.jpg',
      Haze: '/images/haze.jpg',
      Smoke: '/images/smoke.jpg',
      Default: '/images/default.jpg',
  };

  // Determine background image
  const backgroundImage =
      weatherData && weatherData.weather[0].main
          ? backgroundImages[weatherData.weather[0].main] || backgroundImages.Default
          : backgroundImages.Default;

    const handleGeolocation = async () => {
        setError('');
        try {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                const weather = await fetchWeatherByCoords(latitude, longitude);
                const forecast = await fetchForecastByCoords(latitude, longitude);
                const aqi = await fetchAQI(latitude, longitude);

                setWeatherData(weather);
                setForecastData(forecast);
                setAqiData(aqi);
            }, () => {
                setError('Unable to retrieve location.');
            });
        } catch (err) {
            setError('Error fetching data for your location.');
        }
    };

    const handleSearch = async () => {
        setError('');
        try {
            const weather = await fetchWeather(city);
            const forecast = await fetchForecast(city);
            const { coord } = weather;
            const aqi = await fetchAQI(coord.lat, coord.lon);

            setWeatherData(weather);
            setForecastData(forecast);
            setAqiData(aqi);
        } catch (err) {
            setError('City not found. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center text-white flex flex-col items-center justify-center px-4"
          style={{ backgroundImage: `url(${backgroundImage})` }}>
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
            <WeatherCard weatherData={weatherData} aqiData={aqiData} />
            {/* {aqiData && <AQICard aqiData={aqiData} />} */}
            <Forecast forecastData={forecastData} />
        </div>
    );
};

export default Home;
