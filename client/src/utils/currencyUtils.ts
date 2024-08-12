const formatters: { [key: string]: Intl.NumberFormat } = {
  USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
}

const currencyAmount = function (amount: number, currencyCode: string | null): string {
  if (currencyCode == null) {
    return amount.toString()
  }

  if (!formatters[currencyCode]) {
    formatters[currencyCode] = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    })
  }

  return formatters[currencyCode].format(amount)
}

export { currencyAmount }
