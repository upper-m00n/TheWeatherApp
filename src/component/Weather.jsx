import React, { useState } from 'react';
import cloud from '../assets/cloud.png';

function Weather() {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async () => {
        try {
            const data = await forecast(cityName);
            setWeatherData(data);
        } catch (error) {
            throw("error" + error)
        }
    };

    const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center text-white">
            <h1 className="text-[30px] sm:text-[40px] lg:text-[50px] font-bold mt-8 text-center">
                The Weather App
            </h1>
            <div className="mt-10 w-[90%] max-w-[600px] rounded-2xl bg-white shadow-lg p-6 text-gray-800 flex flex-col items-center">
                <img
                    src={cloud}
                    alt="clouds"
                    className="h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px]"
                />
                <div className="mt-6 w-full flex flex-col sm:flex-row">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        className="flex-grow px-4 py-2 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none text-gray-800 border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-b-2xl sm:rounded-r-2xl sm:rounded-bl-none transition"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>
                {weatherData && (
                    <div className="mt-10 w-full flex flex-col gap-6">
                        <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start">
                            <div>
                                <h2 className="text-[24px] sm:text-[28px] font-bold">
                                    {fahrenheitToCelsius(weatherData.main.temp).toFixed(2)}°C
                                </h2>
                                <h3 className="text-[16px] sm:text-[18px]">
                                    Feels like {fahrenheitToCelsius(weatherData.main.feels_like).toFixed(2)}°C
                                </h3>
                                <p className="capitalize text-sm sm:text-base">
                                    {weatherData.weather[0].description}
                                </p>
                            </div>
                            <img
                                src={cloud}
                                alt="weather icon"
                                className="h-12 w-12 sm:h-16 sm:w-16 mt-4 sm:mt-0"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-300 to-blue-400 text-white rounded-2xl shadow-md p-4 flex flex-col sm:flex-row justify-between items-center sm:items-start">
                            <div>
                                <h2 className="text-[24px] sm:text-[28px] font-bold">{weatherData.name}</h2>
                                <h3 className="text-[16px] sm:text-[18px]">
                                    Wind: {weatherData.wind.speed} Km/h
                                </h3>
                                <h3 className="text-[16px] sm:text-[18px]">
                                    Pressure: {weatherData.main.pressure} hPa
                                </h3>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export const forecast = async (cityName) => {
    const url = `https://open-weather13.p.rapidapi.com/city/${cityName}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '190c168198msheee23856c000c8dp167169jsnd16972fffdd8',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        alert('invalid city name')
        console.error(error);
    }
};

export default Weather;
