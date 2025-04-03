"use client"

import { useState, useEffect } from "react"
import SearchBar from "./search-bar"
import CurrentWeather from "./current-weather"
import HourlyForecast from "./hourly-forecast"
import DailyForecast from "./daily-forecast"
import NotificationButton from "./notification-button"
import { getCurrentDate } from "@/lib/date-utils"

// Interfaces para los datos del clima
interface CurrentWeatherData {
  temp: number
  feels_like: number
  humidity: number
  wind_speed: number
  condition: string
  description: string
}

interface HourlyWeatherData {
  time: string
  temp: number
  condition: string
}

interface DailyWeatherData {
  day: string
  min: number
  max: number
  condition: string
}

interface WeatherData {
  city: string
  current: CurrentWeatherData
  hourly: HourlyWeatherData[]
  daily: DailyWeatherData[]
}

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>("Santo Domingo")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { formattedDate, formattedTime } = getCurrentDate()

  const fetchWeatherData = async (searchCity: string) => {
    setError(null)
    try {
      // Paso 1: Obtener coordenadas de la ciudad con Nominatim
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchCity}&format=json&limit=1&featuretype=city`
      )
      const geoData: { lat: string; lon: string }[] = await geoResponse.json()
      if (!geoData.length) {
        throw new Error("No se encontró la ciudad. Por favor, verifica el nombre o selecciona una opción de la lista.")
      }
      const { lat, lon } = geoData[0]

      // Paso 2: Obtener datos de Open-Meteo
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&current_weather=true&timezone=auto`
      )
      if (!weatherResponse.ok) {
        throw new Error("Error al obtener los datos del clima. Por favor, intenta de nuevo.")
      }
      const weatherDataRaw: {
        current_weather?: { temperature: number; windspeed: number; weathercode: number }
        hourly?: { time: string[]; temperature_2m: number[]; relative_humidity_2m: number[]; weather_code: number[] }
        daily?: { time: string[]; temperature_2m_max: number[]; temperature_2m_min: number[]; weather_code: number[] }
      } = await weatherResponse.json()

      // Validar que los datos necesarios estén presentes
      if (!weatherDataRaw.current_weather || !weatherDataRaw.hourly || !weatherDataRaw.daily) {
        throw new Error("Datos del clima incompletos. Por favor, intenta de nuevo.")
      }

      // Mapear códigos de clima a condiciones
      const weatherCodeToCondition = (code: number): string => {
        if (code === 0) return "clear"
        if (code <= 3) return "partly-cloudy"
        if (code <= 48) return "cloudy"
        if (code <= 67) return "rain"
        return "cloudy"
      }

      // Estructurar los datos con valores por defecto si faltan
      const formattedData: WeatherData = {
        city: searchCity,
        current: {
          temp: weatherDataRaw.current_weather.temperature ?? 0,
          feels_like: weatherDataRaw.current_weather.temperature ?? 0,
          humidity: weatherDataRaw.hourly.relative_humidity_2m[0] ?? 0,
          wind_speed: weatherDataRaw.current_weather.windspeed ?? 0,
          condition: weatherCodeToCondition(weatherDataRaw.current_weather.weathercode ?? 0),
          description: weatherCodeToCondition(weatherDataRaw.current_weather.weathercode ?? 0),
        },
        hourly: (weatherDataRaw.hourly.time ?? []).slice(0, 12).map((time, index) => ({
          time: time ? new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "N/A",
          temp: weatherDataRaw.hourly?.temperature_2m[index] ?? 0,
          condition: weatherCodeToCondition(weatherDataRaw.hourly?.weather_code[index] ?? 0),
        })),
        daily: (weatherDataRaw.daily.time ?? []).slice(0, 5).map((time, index) => ({
          day: time ? new Date(time).toLocaleDateString("es-ES", { weekday: "long" }) : "N/A",
          min: weatherDataRaw.daily?.temperature_2m_min[index] ?? 0,
          max: weatherDataRaw.daily?.temperature_2m_max[index] ?? 0,
          condition: weatherCodeToCondition(weatherDataRaw.daily?.weather_code[index] ?? 0),
        })),
      }

      setWeatherData(formattedData)
      setCity(searchCity)
    } catch (error: any) {
      console.error("Error al obtener datos del clima:", error)
      setError(error.message)
      setWeatherData(null)
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    fetchWeatherData(city)
  }, [])

  const handleSearch = (searchCity: string) => {
    fetchWeatherData(searchCity)
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Clima App</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 shadow-sm">
          {error}
        </div>
      )}

      {!weatherData && !error ? (
        <div className="text-center text-gray-500 text-lg">Cargando...</div>
      ) : weatherData ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <CurrentWeather
              city={weatherData.city}
              date={formattedDate}
              time={formattedTime}
              temperature={weatherData.current.temp}
              feelsLike={weatherData.current.feels_like}
              humidity={weatherData.current.humidity}
              windSpeed={weatherData.current.wind_speed}
              condition={weatherData.current.condition}
              description={weatherData.current.description}
            />
            <NotificationButton enabled={notificationsEnabled} onToggle={toggleNotifications} />
            <HourlyForecast hourlyData={weatherData.hourly} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            
            <DailyForecast dailyData={weatherData.daily} />
          </div>
        </div>
      ) : null}
    </div>
  )
}