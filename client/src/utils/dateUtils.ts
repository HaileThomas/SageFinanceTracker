const formatDate = (data: string): string => {
  const [year, month, day] = data.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

export { formatDate }
