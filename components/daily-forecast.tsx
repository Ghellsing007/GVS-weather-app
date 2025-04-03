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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pronóstico de 5 días</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors w-full gap-7"
            >
              <div className="flex items-center space-x-4 min-w-0">
                <div className="w-6 flex-shrink-0">{getWeatherIcon(day.condition)}</div>
                <span className="font-medium truncate">{day.day}</span>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <span className="text-gray-500 text-sm">{day.min}°</span>
                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-300 to-orange-300 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
                <span className="font-medium text-sm">{day.max}°</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}