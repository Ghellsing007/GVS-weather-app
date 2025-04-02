"use client"

import { useState } from "react"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HourlyData {
  time: string
  temp: number
  condition: string
}

interface HourlyForecastProps {
  hourlyData: HourlyData[]
}

export default function HourlyForecast({ hourlyData }: HourlyForecastProps) {
  const [startIndex, setStartIndex] = useState(0)
  const visibleItems = 6
  const maxStartIndex = hourlyData.length - visibleItems

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1))
  }

  const handleNext = () => {
    setStartIndex(Math.min(maxStartIndex, startIndex + 1))
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "clear":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly-cloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-6 w-6 text-blue-200" />
      case "thunderstorm":
        return <CloudLightning className="h-6 w-6 text-purple-500" />
      case "fog":
        return <CloudFog className="h-6 w-6 text-gray-300" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const visibleData = hourlyData.slice(startIndex, startIndex + visibleItems)

  // Find min and max temperatures for scaling the chart
  const minTemp = Math.min(...hourlyData.map((item) => item.temp))
  const maxTemp = Math.max(...hourlyData.map((item) => item.temp))
  const tempRange = maxTemp - minTemp

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Pronóstico por hora</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handlePrevious} disabled={startIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Anterior</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} disabled={startIndex >= maxStartIndex}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end h-40 mt-4">
          {visibleData.map((hour, index) => {
            // Calculate height percentage based on temperature
            const heightPercentage = tempRange === 0 ? 50 : ((hour.temp - minTemp) / tempRange) * 70 + 10

            return (
              <div key={index} className="flex flex-col items-center">
                <span className="text-sm font-medium mb-1">{hour.time}</span>
                <div className="relative flex flex-col items-center justify-end h-28 w-12">
                  <div
                    className="absolute bottom-0 w-full bg-blue-100 rounded-t-md transition-all duration-500 ease-in-out"
                    style={{ height: `${heightPercentage}%` }}
                  />
                  <span className="relative z-10 text-sm font-medium mb-1">{hour.temp}°</span>
                </div>
                <div className="mt-2">{getWeatherIcon(hour.condition)}</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

