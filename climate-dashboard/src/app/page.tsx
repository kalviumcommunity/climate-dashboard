'use client';

import { useState, useEffect } from 'react';

/* ---------- Icons ---------- */
const ThermometerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

const DropletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const WindIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

/* ---------- Types ---------- */
interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  airQuality: number;
  timestamp: string;
}

export default function HomePage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  /* ---------- Time ---------- */
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(
        now.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  /* ---------- Mock Weather ---------- */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const mock: WeatherData = {
          temperature: 22.5,
          humidity: 65,
          windSpeed: 12.3,
          uvIndex: 5,
          airQuality: 42,
          timestamp: new Date().toISOString(),
        };
        setWeatherData(mock);
        setLoading(false);
      } catch {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
    const i = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(i);
  }, []);

  /* ---------- AQI Helper ---------- */
  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'bg-green-500' };
    if (aqi <= 100) return { status: 'Moderate', color: 'bg-yellow-500' };
    if (aqi <= 150) return { status: 'Unhealthy (Sensitive)', color: 'bg-orange-500' };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'bg-red-500' };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'bg-purple-500' };
    return { status: 'Hazardous', color: 'bg-red-800' }; // FIXED
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const airQuality = weatherData ? getAirQualityStatus(weatherData.airQuality) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-2xl font-bold">Climate Dashboard</h1>
          <div className="text-right">
            <p className="text-sm text-gray-500">{date}</p>
            <p className="text-lg font-medium">{time}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card icon={<ThermometerIcon />} label="Temperature" value={`${weatherData.temperature}°C`} />
            <Card icon={<DropletIcon />} label="Humidity" value={`${weatherData.humidity}%`} />
            <Card icon={<WindIcon />} label="Wind Speed" value={`${weatherData.windSpeed} km/h`} />
            <div className="bg-white p-6 rounded-lg shadow flex items-center">
              <div className={`p-3 rounded-full ${airQuality?.color} text-white`}>
                <AlertTriangleIcon />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Air Quality</p>
                <p className="text-2xl font-semibold">{weatherData.airQuality} AQI</p>
                <p className="text-sm text-gray-500">{airQuality?.status}</p>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Recent Alerts</h2>

          <div className="flex items-start p-3 bg-red-50 rounded-lg mb-3">
            <div className="text-red-500">
              <AlertTriangleIcon />
            </div>
            <div className="ml-3">
              <p className="font-medium">High Temperature Alert</p>
              <p className="text-sm text-gray-500">Temperature exceeded 30°C</p>
            </div>
          </div>

          <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
            <div className="text-yellow-500">
              <AlertTriangleIcon />
            </div>
            <div className="ml-3">
              <p className="font-medium">Moderate Air Quality</p>
              <p className="text-sm text-gray-500">AQI is 78</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Small Card Component ---------- */
function Card({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center">
      <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
