"use client"

import { useState } from "react"
import SearchBar from "./search-bar"
import CurrentWeather from "./current-weather"
import HourlyForecast from "./hourly-forecast"
import DailyForecast from "./daily-forecast"
import NotificationButton from "./notification-button"
import { getCurrentDate } from "@/lib/date-utils"

// Placeholder data - would be replaced with actual API data
const weatherData = {
  city: "Madrid",
  current: {
    temp: 23,
    feels_like: 24,
    humidity: 45,
    wind_speed: 10,
    condition: "clear",
    description: "Cielo despejado",
  },
  hourly: [
    { time: "12:00", temp: 23, condition: "clear" },
    { time: "13:00", temp: 24, condition: "clear" },
    { time: "14:00", temp: 25, condition: "clear" },
    { time: "15:00", temp: 26, condition: "partly-cloudy" },
    { time: "16:00", temp: 25, condition: "partly-cloudy" },
    { time: "17:00", temp: 24, condition: "partly-cloudy" },
    { time: "18:00", temp: 22, condition: "cloudy" },
    { time: "19:00", temp: 20, condition: "cloudy" },
    { time: "20:00", temp: 19, condition: "cloudy" },
    { time: "21:00", temp: 18, condition: "cloudy" },
    { time: "22:00", temp: 17, condition: "cloudy" },
    { time: "23:00", temp: 16, condition: "cloudy" },
  ],
  daily: [
    { day: "Lunes", min: 16, max: 26, condition: "clear" },
    { day: "Martes", min: 17, max: 27, condition: "partly-cloudy" },
    { day: "Miércoles", min: 18, max: 28, condition: "partly-cloudy" },
    { day: "Jueves", min: 17, max: 26, condition: "rain" },
    { day: "Viernes", min: 16, max: 24, condition: "rain" },
  ],
}

export default function WeatherDashboard() {
  const [city, setCity] = useState(weatherData.city)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const { formattedDate, formattedTime } = getCurrentDate()

  const handleSearch = (searchCity: string) => {
    // In a real app, this would fetch data from a weather API
    setCity(searchCity)
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Clima App</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CurrentWeather
            city={city}
            date={formattedDate}
            time={formattedTime}
            temperature={weatherData.current.temp}
            feelsLike={weatherData.current.feels_like}
            humidity={weatherData.current.humidity}
            windSpeed={weatherData.current.wind_speed}
            condition={weatherData.current.condition}
            description={weatherData.current.description}
          />
        </div>
        <div className="flex flex-col justify-between gap-6">
          <NotificationButton enabled={notificationsEnabled} onToggle={toggleNotifications} />
        </div>
      </div>

      <HourlyForecast hourlyData={weatherData.hourly} />
      <DailyForecast dailyData={weatherData.daily} />
    </div>
  )
}

