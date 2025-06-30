import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Thermometer, Droplets, Cloud, Sun, Loader2, Leaf } from 'lucide-react';
import { state_arr, s_a } from '../data/cities';
import { useScan } from '../pages/ScanContext';

const OPENWEATHER_API_KEY = "67cb79fed8399fa72a16287f9d7c977d";

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  sunlight: number;
}

const Prediction = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState('0.5');
  const { addPredictionRecord } = useScan();

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

    setPredictionLoading(true);
    setPrediction(null);

    const predictionData = {
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      soil_moisture: parseFloat(soilMoisture),
      rainfall: weatherData.rainfall,
      sunlight: weatherData.sunlight
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/prediction", predictionData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const predictionResult = response.data.prediction;
      setPrediction(predictionResult);
      
      // Add prediction record to context
      addPredictionRecord({
        date: new Date().toISOString().split('T')[0],
        location: `${selectedCity}, ${selectedState}`,
        cropRecommendation: predictionResult,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        rainfall: weatherData.rainfall,
        sunlight: weatherData.sunlight,
        soilMoisture: parseFloat(soilMoisture),
        confidence: Math.floor(Math.random() * 20) + 80 // Mock confidence between 80-100%
      });
      
    } catch (error) {
      console.error("Error predicting disease:", error);
      alert("Failed to get prediction from the server.");
    } finally {
      setPredictionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Environmental Crop Prediction</h1>
          <p className="text-gray-600">Get crop recommendations based on environmental conditions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
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

              <button
                type="submit"
                className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                disabled={!weatherData || predictionLoading}
              >
                {predictionLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Leaf className="h-5 w-5 mr-2" />
                )}
                Get Crop Prediction
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-lg font-semibold mb-6">Environmental Data & Results</h3>
            
            {weatherData && (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4 mb-6">
                <h4 className="font-semibold text-lg mb-4">Current Weather Conditions</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm">Temperature: {weatherData.temperature}°C</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm">Humidity: {weatherData.humidity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Cloud className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm">Rainfall: {weatherData.rainfall}mm</span>
                  </div>
                  <div className="flex items-center">
                    <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="text-sm">Sunlight: {weatherData.sunlight}h</span>
                  </div>
                </div>
              </div>
            )}

            {predictionLoading && (
              <div className="text-center py-8">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-600 mb-4" />
                <p className="text-gray-600">Getting crop prediction...</p>
                <p className="text-sm text-gray-500 mt-2">This prediction will be saved to your dashboard</p>
              </div>
            )}

            {prediction && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Leaf className="h-6 w-6 text-green-600 mr-2" />
                    <h4 className="font-semibold text-green-800">Crop Recommendation</h4>
                  </div>
                  <p className="text-green-700 text-lg font-medium">{prediction.replace('___', ' - ')}</p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    ✅ This prediction has been automatically saved to your dashboard for future reference.
                  </p>
                </div>
              </div>
            )}

            {!weatherData && !predictionLoading && (
              <div className="text-center py-8 text-gray-500">
                <p>Select location and fetch weather data to get started</p>
                <p className="text-sm mt-2">All predictions are automatically saved to your dashboard</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;