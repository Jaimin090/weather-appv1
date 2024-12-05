import React from 'react';

const Forecast = ({ forecastData }) => {
    if (!forecastData) return null;

    return (
        <div className="mt-6 w-full overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">5-Day Forecast (Every 3 Hours)</h2>
            <div className="flex space-x-4 mb-6">
                {forecastData.list.map((item, index) => (
                    <div
                        key={index}
                        className="bg-opacity-85 bg-white text-black rounded-md p-4 shadow-md min-w-[150px] text-center"
                    >
                        <p className="text-sm font-semibold">{new Date(item.dt_txt).toLocaleDateString()}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="mx-auto"
                        />
                        <p className="text-lg font-bold">{item.main.temp}°C</p>
                        <p className="text-sm capitalize">{item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
