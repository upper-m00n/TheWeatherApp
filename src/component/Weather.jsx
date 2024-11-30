import React, { useState } from 'react';
import cloud from '../assets/cloud.png';

function Weather() {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError(''); 
        try {
            const data = await forecast(cityName);
            if (!data || !data.location || !data.current) {
                setError('City not found. Please check the city name.');
                setWeatherData(null);
            } else {
                setWeatherData(data);
            }
        } catch (error) {
            setError('An error occurred while fetching the weather data.');
            console.error("Error:", error);
            setWeatherData(null);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center text-white px-4 py-8 sm:py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8">
                The Weather App
            </h1>

            <div className="flex flex-col items-center w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                <img
                    src={cloud}
                    alt="clouds"
                    className="h-28 sm:h-36 lg:h-44 w-auto"
                />
                <div className="mt-6 w-full flex flex-col sm:flex-row sm:gap-4">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        className="flex-grow px-4 py-3 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none text-gray-800 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none transition font-semibold"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>
            </div>

            {error ? (
                <div className="mt-8 text-center text-white">
                    <p>{error}</p>
                </div>
            ) : (
                weatherData && (
                    <div className="mt-8 w-full flex flex-col gap-8 items-center">
                        {/* Combined Current Weather and Location Details Section */}
                        <div className="max-w-[600px] w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row sm:items-center justify-between sm:gap-8">
                            {/* Current Weather Section */}
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                                <h2 className="text-3xl font-bold mb-2">{weatherData.current.temp_c}°C</h2>
                                <h3 className="text-lg text-gray-200 mb-2">Feels like {weatherData.current.feelslike_c}°C</h3>
                                <p className="capitalize text-sm">Precipitation: {weatherData.current.precip_mm} mm</p>
                            </div>

                            {/* Weather Icon */}
                            <img
                                src={weatherData.current.condition.icon}
                                alt="weather icon"
                                className="h-20 w-20 sm:h-24 sm:w-24 mt-4 sm:mt-0"
                            />

                            {/* Location Details Section */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:gap-8 mt-4 sm:mt-0">
                                <div>
                                    <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
                                    <h3 className="text-lg">Wind: {weatherData.current.wind_kph} Km/h</h3>
                                    <h3 className="text-lg">Pressure: {weatherData.current.pressure_mb} hPa</h3>
                                </div>
                            </div>
                        </div>

                        {/* 3-Day Forecast Section */}
                        {weatherData.forecast && (
                            <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                                <h2 className="text-xl font-bold mb-4 text-center">
                                    3-Day Forecast
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                    {weatherData.forecast.forecastday.map((day, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl shadow p-4"
                                        >
                                            <div>
                                                <h3 className="text-lg font-semibold">{day.date}</h3>
                                                <p className="text-sm font-semibold">Avg Temp: {day.day.avgtemp_c}°C</p>
                                                <p className="text-sm font-semibold">Precipitation: {day.day.totalprecip_mm} mm</p>
                                                <p className="text-sm font-semibold">Humidity: {day.day.avghumidity}%</p>
                                            </div>
                                            <img
                                                src={day.day.condition.icon}
                                                alt="weather condition"
                                                className="h-[100px] w-[100px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}

export const forecast = async (cityName) => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${cityName}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '190c168198msheee23856c000c8dp167169jsnd16972fffdd8',
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error('Invalid city name');
    }
};

export default Weather;
