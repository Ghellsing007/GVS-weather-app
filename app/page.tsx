import WeatherDashboard from "@/components/weather-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <WeatherDashboard />
      </div>
    </main>
  )
}

