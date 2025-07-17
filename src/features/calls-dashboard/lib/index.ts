export const formatSecondsToMinutes = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0] // 'YYYY-MM-DD'
}
