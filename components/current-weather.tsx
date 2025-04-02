import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Droplets, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CurrentWeatherProps {
  city: string
  date: string
  time: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  condition: string
  description: string
}

export default function CurrentWeather({
  city,
  date,
  time,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  condition,
  description,
}: CurrentWeatherProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "clear":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "partly-cloudy":
        return <Cloud className="h-16 w-16 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-16 w-16 text-gray-500" />
      case "rain":
        return <CloudRain className="h-16 w-16 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-16 w-16 text-blue-200" />
      case "thunderstorm":
        return <CloudLightning className="h-16 w-16 text-purple-500" />
      case "fog":
        return <CloudFog className="h-16 w-16 text-gray-300" />
      default:
        return <Sun className="h-16 w-16 text-yellow-500" />
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">{city}</h2>
            <p className="text-gray-500">
              {date} | {time}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            {getWeatherIcon(condition)}
            <div className="ml-4">
              <div className="text-4xl font-bold text-gray-800">{temperature}°C</div>
              <div className="text-gray-500">{description}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full mr-2">
              <Sun className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sensación</p>
              <p className="font-medium">{feelsLike}°C</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full mr-2">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Humedad</p>
              <p className="font-medium">{humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-full mr-2">
              <Wind className="h-5 w-5 text-teal-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Viento</p>
              <p className="font-medium">{windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

