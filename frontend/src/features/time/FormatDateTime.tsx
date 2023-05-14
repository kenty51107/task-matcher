export const addTimeZone = (dateTime: string) => {
  return `${dateTime}:00+09:00`
}

export const formatDateTime = (dateTime?: string) => {
  const date = dateTime ? new Date(dateTime) : new Date()
  const year = date.getFullYear().toString().padStart(4, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${year}-${month}-${day}T${hour}:${minute}`
}

export const formatDisplayDateTime = (dateTime?: string) => {
  if (!dateTime) return
  return formatDateTime(dateTime).replace('T', ' ')
}
