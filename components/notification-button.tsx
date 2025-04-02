import { Bell, BellOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface NotificationButtonProps {
  enabled: boolean
  onToggle: () => void
}

export default function NotificationButton({ enabled, onToggle }: NotificationButtonProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {enabled ? <Bell className="h-5 w-5 text-blue-500" /> : <BellOff className="h-5 w-5 text-gray-400" />}
            <div>
              <p className="font-medium">Notificaciones</p>
              <p className="text-xs text-gray-500">{enabled ? "Activadas" : "Desactivadas"}</p>
            </div>
          </div>
          <Switch checked={enabled} onCheckedChange={onToggle} aria-label="Activar notificaciones" />
        </div>
      </CardContent>
    </Card>
  )
}

