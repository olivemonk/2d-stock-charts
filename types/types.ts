export interface DailyStockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

type DailyPriceData = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

type TimeSeriesData = {
  [date: string]: DailyPriceData;
};

type MetaData = {
  "1. Information": string;
  "2. Symbol": string;
  "3. Last Refreshed": string;
  "4. Output Size": string;
  "5. Time Zone": string;
};

export type StockData = {
  "Meta Data": MetaData;
  "Time Series (Daily)": TimeSeriesData;
};

// types for SMA data

export interface IndicatorMetaData {
  "1: Symbol": string;
  "2: Indicator": string;
  "3: Last Refreshed": string;
  "4: Interval": string;
  "5: Time Period": number;
  "6: Series Type"?: string;
  "7: Time Zone": string;
}

export interface SMAData {
  SMA: string;
}

export interface RSIData {
  RSI: string;
}

export interface ADXData {
  ADX: string;
}

export interface AroonData {
  "Aroon Down": string;
  "Aroon Up": string;
}

export interface SMATechnicalAnalysis {
  [date: string]: SMAData;
}

export interface RSITechnicalAnalysis {
  [date: string]: RSIData;
}

export interface ADXTechnicalAnalysis {
  [date: string]: ADXData;
}

export interface AROONTechnicalAnalysis {
  [date: string]: AroonData;
}

export interface SMAData {
  "Meta Data": IndicatorMetaData;
  "Technical Analysis: SMA": SMATechnicalAnalysis;
}

export interface RSIData {
  "Meta Data": IndicatorMetaData;
  "Technical Analysis: RSI": RSITechnicalAnalysis;
}

export interface ADXData {
  "Meta Data": IndicatorMetaData;
  "Technical Analysis: ADX": ADXTechnicalAnalysis;
}

export interface AroonResponse {
  "Meta Data": MetaData;
  "Technical Analysis: AROON": AROONTechnicalAnalysis;
}

export type Ticker = {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
};

export interface TickerApiResponse {
    bestMatches: {
      '1. symbol': string;
      '2. name': string;
      '3. type': string;
      '4. region': string;
      '5. marketOpen': string;
      '6. marketClose': string;
      '7. timezone': string;
      '8. currency': string;
      '9. matchScore': string;
    }[];
  }
