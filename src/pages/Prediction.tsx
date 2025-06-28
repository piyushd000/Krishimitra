import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Thermometer, Droplets, Cloud, Sun, Loader2 } from 'lucide-react';
import { state_arr, s_a } from '../data/cities';

const OPENWEATHER_API_KEY = "67cb79fed8399fa72a16287f9d7c977d";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  sunlight: number;
}

const Predict = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [soilMoisture, setSoilMoisture] = useState('0.5');

  useEffect(() => {
    const stateIndex = state_arr.indexOf(selectedState);
    if (selectedState && stateIndex >= 0 && s_a[stateIndex]) {
      setCities(s_a[stateIndex].split('|').map(city => city.trim()));
    } else {
      setCities([]);
    }
    setSelectedCity('');
  }, [selectedState]);

  const fetchWeatherData = async () => {
    if (!selectedCity || !OPENWEATHER_API_KEY) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},IN&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      const sunlightHours = calculateSunlightHours(
        response.data.sys.sunrise,
        response.data.sys.sunset
      );

      setWeatherData({
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        rainfall: response.data.rain?.['1h'] || 0,
        sunlight: sunlightHours
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSunlightHours = (sunrise: number, sunset: number) => {
    const sunlightSeconds = sunset - sunrise;
    return Number((sunlightSeconds / 3600).toFixed(1));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!weatherData) return;

    const predictionData = {
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      soil_moisture: parseFloat(soilMoisture),
      rainfall: weatherData.rainfall,
      sunlight: weatherData.sunlight
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", predictionData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error predicting disease:", error);
      alert("Failed to get prediction from the server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Environmental Disease Prediction</h1>
          <p className="text-gray-600">Get crop disease predictions based on environmental conditions</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Select a state</option>
                  {state_arr.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select City</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                  disabled={!selectedState}
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 mr-2" />
                  Soil Moisture (0-1)
                </div>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <button
              type="button"
              onClick={fetchWeatherData}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={!selectedCity || loading}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
              ) : (
                <Cloud className="h-5 w-5 mr-2" />
              )}
              Fetch Weather Data
            </button>

            {weatherData && (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg mb-4">Current Weather Conditions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                    <span>Temperature: {weatherData.temperature}°C</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    <span>Humidity: {weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 text-gray-500 mr-2" />
                    <span>Rainfall: {weatherData.rainfall}mm</span>
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                    <span>Sunlight: {weatherData.sunlight}h</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
              disabled={!weatherData}
            >
              Predict Disease
            </button>
          </form>

          {prediction && (
            <div className="mt-6 p-6 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Prediction Result</h3>
              <p className="text-green-800">{prediction.replace('___', ' - ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;