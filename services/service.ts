export const getStockData = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
      symbol === "" ? "IBM" : symbol
    }&outputsize=full&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getSMAPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=SMA&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=10&series_type=close&apikey=${
      process.env.NEXT_PUBLIC_API_KEY
    }`
  );
  const data = await response.json();
  return data;
};

export const getRSIPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=RSI&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=weekly&time_period=10&series_type=open&apikey=${
      process.env.NEXT_PUBLIC_API_KEY
    }`
  );
  const data = await response.json();
  return data;
};

export const getADXPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=ADX&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=10&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getAROONPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=AROON&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=14&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getTicker = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};
