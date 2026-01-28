"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components";

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

  useEffect(() => {
    const fetchWeather = async () => {
      // Simulate slow network
      await new Promise((r) => setTimeout(r, 2000));

      const mock: WeatherData = {
        temperature: 22.5,
        humidity: 65,
        windSpeed: 12.3,
        uvIndex: 5,
        airQuality: 42,
        timestamp: new Date().toISOString(),
      };

      if (!mock) {
        throw new Error("Weather data unavailable");
      }

      setWeatherData(mock);
    };

    fetchWeather();
  }, []);

  const getAirQualityStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "bg-green-500" };
    if (aqi <= 100) return { status: "Moderate", color: "bg-yellow-500" };
    if (aqi <= 150) return { status: "Unhealthy (Sensitive)", color: "bg-orange-500" };
    if (aqi <= 200) return { status: "Unhealthy", color: "bg-red-500" };
    if (aqi <= 300) return { status: "Very Unhealthy", color: "bg-purple-500" };
    return { status: "Hazardous", color: "bg-red-800" };
  };

  if (!weatherData) return null;

  const airQuality = getAirQualityStatus(weatherData.airQuality);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card icon={<ThermometerIcon />} label="Temperature" value={`${weatherData.temperature}°C`} />
      <Card icon={<DropletIcon />} label="Humidity" value={`${weatherData.humidity}%`} />
      <Card icon={<WindIcon />} label="Wind Speed" value={`${weatherData.windSpeed} km/h`} />

      <div className="bg-white p-6 rounded-lg shadow flex items-center">
        <div className={`p-3 rounded-full ${airQuality.color} text-white`}>
          <AlertTriangleIcon />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-500">Air Quality</p>
          <p className="text-2xl font-semibold">{weatherData.airQuality} AQI</p>
          <p className="text-sm text-gray-500">{airQuality.status}</p>
        </div>
      </div>
    </div>
  );
}
