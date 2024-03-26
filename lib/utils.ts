import { ADXData, AroonData, AroonResponse, DailyStockData, RSIData, SMAData, StockData, Ticker, TickerApiResponse } from "@/types/types";
import { type ClassValue, clsx } from "clsx"
import { CandlestickData, LineData, Time } from "lightweight-charts";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatStockData = (stockData: StockData | undefined): { candlestickData: CandlestickData<string>[]; volumeData: { time: string; value: number; color: string }[] } => {
  const candlestickData: CandlestickData<string>[] = [];
  const volumeData: { time: string; value: number; color: string }[] = [];

  if (stockData && stockData["Time Series (Daily)"]) {
    let prevVolume = 0;

    Object.entries(stockData["Time Series (Daily)"]).forEach(([key, value]) => {
      const time: string = key;
      const open = parseFloat(value["1. open"]);
      const high = parseFloat(value["2. high"]);
      const low = parseFloat(value["3. low"]);
      const close = parseFloat(value["4. close"]);
      const volume = parseFloat(value["5. volume"]);

      candlestickData.push({ time, open, high, low, close });

      const volumeColor = prevVolume !== 0 ? (volume > prevVolume ? '#26a69a' : '#ef5350') : '#26a69a';
      volumeData.push({ time, value: volume, color: volumeColor });

      prevVolume = volume;
    });

    candlestickData.sort((a, b) => a.time.localeCompare(b.time));
    volumeData.sort((a, b) => a.time.localeCompare(b.time));
  }

  return { candlestickData, volumeData };
};


export const formatSMAPoints = (smaData: SMAData | undefined): LineData<string>[] => {
  const formattedSMAPoints: LineData<string>[] = [];

  if (smaData && smaData["Technical Analysis: SMA"]) {
    Object.entries(smaData["Technical Analysis: SMA"]).forEach(([key, value]) => {
      const time: string = key; // Use the date string as the time
      formattedSMAPoints.push({
        time,
        value: parseFloat(value.SMA),
      });
    });
  }

  formattedSMAPoints.sort((a, b) => a.time.localeCompare(b.time));

  return formattedSMAPoints;
}

export const formatRSIPoints = (rsiData: RSIData | undefined): LineData<string>[] => {
  const formattedRSIPoints: LineData<string>[] = [];

  if (rsiData && rsiData["Technical Analysis: RSI"]) {
    Object.entries(rsiData["Technical Analysis: RSI"]).forEach(([key, value]) => {
      const time: string = key; 
      formattedRSIPoints.push({
        time,
        value: parseFloat(value.RSI),
      });
    });
  }

  formattedRSIPoints.sort((a, b) => a.time.localeCompare(b.time));

  return formattedRSIPoints;
}


export const formatADXPoints = (adxData: ADXData | undefined): LineData<string>[] => {
  const formattedADXPoints: LineData<string>[] = [];

  if (adxData && adxData["Technical Analysis: ADX"]) {
    Object.entries(adxData["Technical Analysis: ADX"]).forEach(([key, value]) => {
      const time: string = key; 
      formattedADXPoints.push({
        time,
        value: parseFloat(value.ADX),
      });
    });
  }

  formattedADXPoints.sort((a, b) => a.time.localeCompare(b.time));

  return formattedADXPoints;
}

export const formatAROONPoints = (data: AroonResponse | undefined) => {
  const aroonUpData: { time: string, value: number }[] = [];
  const aroonDownData: { time: string, value: number }[] = [];

  if (data && data["Technical Analysis: AROON"]) {
      const technicalAnalysis = data["Technical Analysis: AROON"];
      Object.entries(technicalAnalysis).forEach(([date, aroonData]) => {
          const time = date;
          const aroonUp = parseFloat(aroonData["Aroon Up"]);
          const aroonDown = parseFloat(aroonData["Aroon Down"]);

          aroonUpData.push({ time, value: aroonUp });
          aroonDownData.push({ time, value: aroonDown });
      });

      // Sort the data by time in ascending order
      aroonUpData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
      aroonDownData.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }

  return { aroonUpData, aroonDownData };
};

export const formatTickerData = (apiResponse: TickerApiResponse): Ticker[] => {
  const tickerData: Ticker[] = [];

  if (apiResponse && apiResponse.bestMatches) {
    apiResponse.bestMatches.forEach((match) => {
      const { 
        '1. symbol': symbol, 
        '2. name': name, 
        '3. type': type, 
        '4. region': region, 
        '5. marketOpen': marketOpen, 
        '6. marketClose': marketClose, 
        '7. timezone': timezone, 
        '8. currency': currency, 
        '9. matchScore': matchScore 
      } = match;
      tickerData.push({ symbol, name, type, region, marketOpen, marketClose, timezone, currency, matchScore });
    });
  }

  return tickerData;
}
