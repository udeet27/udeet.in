"use client";
import React, { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiFog, WiNightClear } from "react-icons/wi";
import Loader from "./Loader";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
const CITY = process.env.NEXT_PUBLIC_CITY; // Change to your preferred city

const WeatherWidget: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weather, setWeather] = useState<string>("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setTemperature(Math.round(data.main.temp));
        setWeather(data.weather[0].main);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 5;
    
    if (isNight && weather === "Clear") {
      return <WiNightClear size={24} className="inline-block" />;
    }
    
    switch (weather) {
      case "Clear":
        return <WiDaySunny size={24} className="inline-block" />;
      case "Clouds":
        return <WiCloud size={24} className="inline-block" />;
      case "Rain":
        return <WiRain size={24} className="inline-block" />;
      case "Snow":
        return <WiSnow size={24} className="inline-block" />;
      case "Fog":
      case "Mist":
        return <WiFog size={24} className="inline-block" />;
      default:
        return <WiCloud size={24} className="inline-block" />;
    }
  };

  return (
    <span className="relative group inline-block">
      {getWeatherIcon()}
      <span className="text-sm inline-block">
        {temperature !== null ? `${temperature}°C` : <Loader />}
      </span>
    </span>
  );
};

export default WeatherWidget;