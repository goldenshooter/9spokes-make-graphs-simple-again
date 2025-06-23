function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const areaData = () => [
  { month: '30-06-2024', balance: generateRandomNumber(100, 1500) },
  { month: '31-07-2024', balance: generateRandomNumber(100, 1500) },
  { month: '31-08-2024', balance: generateRandomNumber(100, 1500) },
  { month: '30-09-2024', balance: generateRandomNumber(100, 1500) },
  { month: '31-10-2024', balance: generateRandomNumber(100, 1500) },
  { month: '30-11-2024', balance: generateRandomNumber(100, 1500) },
  { month: '31-12-2024', balance: generateRandomNumber(100, 1500) },
  { month: '31-01-2025', balance: generateRandomNumber(100, 1500) },
  { month: '28-02-2025', balance: generateRandomNumber(100, 1500) },
  { month: '31-03-2025', balance: generateRandomNumber(100, 1500) },
]

export const barData = () => [
  {
    month: '30-06-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-07-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-08-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '30-09-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-10-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '30-11-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-12-2024',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-01-2025',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '28-02-2025',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
  {
    month: '31-03-2025',
    total_cash_in: generateRandomNumber(800, 1800),
    total_cash_out: generateRandomNumber(800, 1800),
  },
]

export const todayIndex = 22
export const todayValue = 200
export const scrollData = () =>
  Array.from({ length: 30 }, (_, i) => {
    if (i < todayIndex) {
      return {
        day: `Day ${i + 1}`,
        amount: Math.floor(Math.random() * 500), // Historical data
        isHistorical: true,
      }
    }
    if (i === todayIndex) {
      return {
        day: `Day ${i + 1}`,
        amount: todayValue,
        forecastHigh: todayValue, // Start all forecasts from today
        forecastMid: todayValue,
        forecastLow: todayValue,
        isToday: true,
      }
    }
    // Forecast data
    const daysAfterToday = i - todayIndex // Changed from -1
    const fluctuation = Math.floor(Math.random() * 40 - 20)

    return {
      day: `Day ${i + 1}`,
      forecastHigh: todayValue + daysAfterToday * 15 + fluctuation + 20,
      forecastMid: todayValue + daysAfterToday * 5 + fluctuation,
      forecastLow: todayValue - daysAfterToday * 10 + fluctuation - 20,
      isForecast: true,
    }
  })
