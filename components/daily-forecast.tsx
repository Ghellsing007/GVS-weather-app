import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DailyData {
  day: string
  min: number
  max: number
  condition: string
}

interface DailyForecastProps {
  dailyData: DailyData[]
}

export default function DailyForecast({ dailyData }: DailyForecastProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pronóstico de 5 días</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="mr-4 w-10">{getWeatherIcon(day.condition)}</div>
                <span className="font-medium">{day.day}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">{day.min}°</span>
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-300 to-orange-300 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="font-medium">{day.max}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

