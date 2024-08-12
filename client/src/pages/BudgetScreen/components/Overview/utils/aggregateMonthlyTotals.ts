interface ExpenseResponse {
  amount: number
  date: string
  bank_name: string
}

export const aggregateMonthlyTotals = (expenses: ExpenseResponse[]) => {
  const result: number[] = new Array(13).fill(0)
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear(),
    currentMonth = currentDate.getMonth()

  expenses.forEach((transaction) => {
    const transactionDate = new Date(transaction.date)
    const transactionYear = transactionDate.getFullYear(),
      transactionMonth = transactionDate.getMonth()

    const index = (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth)
    result[result.length - 1 - index] += transaction.amount
  })

  return result
}
