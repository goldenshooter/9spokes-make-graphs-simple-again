export const areaData = [
  { month: '30-06-2024', balance: 400 },
  { month: '31-07-2024', balance: 520 },
  { month: '31-08-2024', balance: 480 },
  { month: '30-09-2024', balance: 530 },
  { month: '31-10-2024', balance: 610 },
  { month: '30-11-2024', balance: 590 },
  { month: '31-12-2024', balance: 650 },
  { month: '31-01-2025', balance: 700 },
  { month: '28-02-2025', balance: 670 },
  { month: '31-03-2025', balance: 720 },
];

export const barData = [
  { month: '30-06-2024', total_cash_in: 1200, total_cash_out: 950 },
  { month: '31-07-2024', total_cash_in: 1350, total_cash_out: 1100 },
  { month: '31-08-2024', total_cash_in: 1280, total_cash_out: 1050 },
  { month: '30-09-2024', total_cash_in: 1400, total_cash_out: 1200 },
  { month: '31-10-2024', total_cash_in: 1500, total_cash_out: 1300 },
  { month: '30-11-2024', total_cash_in: 1420, total_cash_out: 1250 },
  { month: '31-12-2024', total_cash_in: 1600, total_cash_out: 1400 },
  { month: '31-01-2025', total_cash_in: 1700, total_cash_out: 1500 },
  { month: '28-02-2025', total_cash_in: 1650, total_cash_out: 1450 },
  { month: '31-03-2025', total_cash_in: 1750, total_cash_out: 1550 },
];

export const todayIndex = 22;
export const todayValue = Math.floor(Math.random() * 500);
export const scrollData = Array.from({ length: 30 }, (_, i) => {
  if (i < todayIndex) {
    return {
      day: `Day ${i + 1}`,
      amount: Math.floor(Math.random() * 500), // Historical data
      isHistorical: true,
    };
  }
  if (i === todayIndex) {
    return {
      day: `Day ${i + 1}`,
      amount: todayValue,
      forecastHigh: todayValue, // Start all forecasts from today
      forecastMid: todayValue,
      forecastLow: todayValue,
      isToday: true,
    };
  }
  // Forecast data
  const daysAfterToday = i - todayIndex; // Changed from -1
  const fluctuation = Math.floor(Math.random() * 40 - 20);

  return {
    day: `Day ${i + 1}`,
    forecastHigh: todayValue + daysAfterToday * 15 + fluctuation + 20,
    forecastMid: todayValue + daysAfterToday * 5 + fluctuation,
    forecastLow: todayValue - daysAfterToday * 10 + fluctuation - 20,
    isForecast: true,
  };
});
