import React from 'react';

const WeatherCard = ({ weatherData, aqiData }) => {
    if (!weatherData || !aqiData) return null;

    const { name, sys, main, weather, wind } = weatherData;
    const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const { main: aqiMain, components } = aqiData.list[0];

    return (
        <div className="bg-gradient-to-br from-indigo-600 to-blue-400 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
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
            
            {/* AQI Information */}
            <div className="mt-6 p-4 bg-stone-200 text-black rounded-md shadow-md">
                <h3 className="text-2xl font-bold mb-2">Air Quality Index (AQI)</h3>
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl">AQI Level: <span className={`text-lg font-semibold ${aqiMain.aqi <= 3 ? 'text-green-500' : aqiMain.aqi === 4 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {aqiLevels[aqiMain.aqi - 1]}</span></p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>PM2.5: <span className="font-medium">{components.pm2_5} µg/m³</span></p>
                    <p>PM10: <span className="font-medium">{components.pm10} µg/m³</span></p>
                    <p>Ozone (O₃): <span className="font-medium">{components.o3} µg/m³</span></p>
                    <p>Carbon Monoxide (CO): <span className="font-medium">{components.co} µg/m³</span></p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
