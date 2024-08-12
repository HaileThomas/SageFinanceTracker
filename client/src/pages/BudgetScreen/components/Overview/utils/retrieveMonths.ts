export const retrieveMonths = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const index = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const first = months.slice(index).map((month) => `${month} ${currentYear - 1}`)
  const second = months.slice(0, index + 1).map((month) => `${month} ${currentYear}`)

  return first.concat(second)
}
