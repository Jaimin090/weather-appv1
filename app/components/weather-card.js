import React from 'react';

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return null;

    const { name, sys, main, weather, wind } = weatherData;

    return (
        <div className="bg-gradient-to-br from-blue-400 to-indigo-700 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-3xl font-bold">
                {name}, {sys.country}
            </h2>
            <div className="flex items-center mt-4">
                <img
                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                    alt={weather[0].description}
                    className="w-16 h-16"
                />
                <p className="text-xl capitalize ml-4">{weather[0].description}</p>
            </div>
            <p className="text-5xl font-extrabold mt-4">{main.temp}°C</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <p>Feels like: <span className="font-semibold">{main.feels_like}°C</span></p>
                <p>Humidity: <span className="font-semibold">{main.humidity}%</span></p>
                <p>Wind Speed: <span className="font-semibold">{wind.speed} m/s</span></p>
                <p>Pressure: <span className="font-semibold">{main.pressure} hPa</span></p>
            </div>
        </div>
    );
};

export default WeatherCard;
