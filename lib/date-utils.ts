export function getCurrentDate() {
  const now = new Date()

  // Format date: "Lunes, 15 de Abril de 2023"
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const formattedDate = now.toLocaleDateString("es-ES", options)

  // Format time: "14:30"
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }

  const formattedTime = now.toLocaleTimeString("es-ES", timeOptions)

  return {
    formattedDate: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    formattedTime,
  }
}

