export const getStockData = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
      symbol === "" ? "IBM" : symbol
    }&outputsize=full&apikey=demo`
  );
  const data = await response.json();
  return data;
};

export const getSMAPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=SMA&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=10&series_type=close&apikey=demo`
  );
  const data = await response.json();
  return data;
};

export const getRSIPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=RSI&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=weekly&time_period=10&series_type=open&apikey=demo`
  );
  const data = await response.json();
  return data;
};

export const getADXPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=ADX&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=10&apikey=demo`
  );
  const data = await response.json();
  return data;
};

export const getAROONPoints = async (symbol: string) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=AROON&symbol=${
      symbol === "" ? "IBM" : symbol
    }&interval=daily&time_period=14&apikey=demo`
  );
  const data = await response.json();
  return data;
};
