"use client";

import {
  formatADXPoints,
  formatAROONPoints,
  formatRSIPoints,
  formatSMAPoints,
  formatStockData,
  formatTickerData,
} from "@/lib/utils";
import {
  getADXPoints,
  getAROONPoints,
  getRSIPoints,
  getSMAPoints,
  getStockData,
  getTicker,
} from "@/services/service";
import {
  ADXData,
  AroonResponse,
  RSIData,
  SMAData,
  StockData,
  Ticker,
} from "@/types/types";
import { CandlestickData, createChart, Time } from "lightweight-charts";
import {
  AreaChart,
  BarChartBig,
  CircleX,
  LineChart,
  Loader2,
  ScatterChart,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Indicator = "SMA" | "RSI" | "ADX" | "AROON" | "NONE" | "NULL";

const LWCChart = () => {
  const [stockData, setStockData] = useState<StockData | undefined>(undefined);
  const [symbol, setSymbol] = useState<string>("IBM");
  const [search, setSearch] = useState<string>("");
  const [tickers, setTickers] = useState<Ticker[]>();
  const [tickerLoading, setTickerLoading] = useState<boolean>(false);

  const [smaData, setSmaData] = useState<SMAData | undefined>(undefined);
  const [rsiData, setRsiData] = useState<RSIData | undefined>(undefined);
  const [adxData, setAdxData] = useState<ADXData | undefined>(undefined);
  const [aroonData, setAroonData] = useState<AroonResponse | undefined>(
    undefined
  );
  const [indicatorError, setIndicatorError] = useState<string | null>(null);
  const [indicatorLoading, setIndicatorLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [indicator, setIndicator] = useState<Indicator>("NULL");

  const [candlePrice, setCandlePrice] = useState<CandlestickData<Time>>();

  useEffect(() => {
    setTickerLoading(true);
    const debounceFn = setTimeout(() => {
      getTicker(search)
        .then((data) => {
          const formattedData = formatTickerData(data);
          setTickers(formattedData);
          console.log(tickers);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setTickerLoading(false);
        });
    }, 500);

    return () => {
      clearTimeout(debounceFn);
    };
  }, [search]);

  useEffect(() => {
    setLoading(true);
    getStockData(symbol)
      .then((data) => {
        setStockData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setSearch("");
      });
  }, [symbol]);

  useEffect(() => {
    if (indicator === "SMA") {
      setIndicatorLoading(true);
      setIndicatorError(null);
      getSMAPoints(symbol)
        .then((data) => {
          setSmaData(data);
        })
        .catch((err) => {
          setIndicatorError(err);
        })
        .finally(() => {
          setIndicatorLoading(false);
        });
    } else if (indicator === "RSI") {
      setIndicatorLoading(true);
      setIndicatorError(null);
      getRSIPoints(symbol)
        .then((data) => {
          setRsiData(data);
        })
        .catch((err) => {
          setIndicatorError(err);
        })
        .finally(() => {
          setIndicatorLoading(false);
        });
    } else if (indicator === "ADX") {
      setIndicatorLoading(true);
      setIndicatorError(null);
      getADXPoints(symbol)
        .then((data) => {
          setAdxData(data);
        })
        .catch((err) => {
          setIndicatorError(err);
        })
        .finally(() => {
          setIndicatorLoading(false);
        });
    } else if (indicator === "AROON") {
      setIndicatorLoading(true);
      setIndicatorError(null);
      getAROONPoints(symbol)
        .then((data) => {
          setAroonData(data);
        })
        .catch((err) => {
          setIndicatorError(err);
        })
        .finally(() => {
          setIndicatorLoading(false);
        });
    } else if (indicator === "NONE") {
      setAdxData(undefined);
      setAroonData(undefined);
      setRsiData(undefined);
      setSmaData(undefined);
      setIndicator("NULL");
    }
  }, [indicator]);

  const { candlestickData, volumeData } = useMemo(
    () => formatStockData(stockData),
    [stockData]
  );
  const smaPoints = useMemo(() => formatSMAPoints(smaData), [smaData]);
  const rsiPoints = useMemo(() => formatRSIPoints(rsiData), [rsiData]);
  const adxPoints = useMemo(() => formatADXPoints(adxData), [adxData]);
  const { aroonUpData, aroonDownData } = useMemo(
    () => formatAROONPoints(aroonData),
    [aroonData]
  );

  //   const [candlePrice, setCandlePrice] = useState<CandlestickData<Time>>();
  const chartRef = useRef<HTMLDivElement>(null);
  const rsiRef = useRef<HTMLDivElement>(null);
  const adxRef = useRef<HTMLDivElement>(null);
  const aroonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = createChart(chartRef.current);
      const rsiChart = rsiRef.current && createChart(rsiRef.current);
      const adxChart = adxRef.current && createChart(adxRef.current);
      const aroonChart = aroonRef.current && createChart(aroonRef.current);

      const numIndicatorCharts =
        (rsiData ? 1 : 0) + (adxData ? 1 : 0) + (aroonData ? 1 : 0);
      const chartWidth = window.innerWidth - 20;

      let chartHeightRatio;
      if (numIndicatorCharts === 1) {
        chartHeightRatio = 0.5;
      } else if (numIndicatorCharts === 2) {
        chartHeightRatio = 1 / 3;
      } else if (numIndicatorCharts === 3) {
        chartHeightRatio = 0.25;
      } else {
        chartHeightRatio = 1;
      }
      const availableHeight = window.innerHeight - 150;
      const chartHeight = Math.min(
        availableHeight,
        chartHeightRatio * window.innerHeight
      );

      chart.applyOptions({
        layout: {
          background: { color: "#222" },
          textColor: "#DDD",
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
        width: chartWidth,
        height: chartHeight,
        localization: {
          locale: "en-IN",
          priceFormatter: (price: number) => {
            const myPrice = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 0,
            }).format(price);
            return myPrice;
          },
        },
      });

      if (rsiRef.current) {
        rsiChart?.applyOptions({
          layout: {
            background: { color: "#222" },
            textColor: "#DDD",
          },
          grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
          },
          width: window.innerWidth - 20,
          height: 200,
        });

        rsiChart?.timeScale().applyOptions({
          borderColor: "#71649C",
          rightOffset: 40,
          barSpacing: 10,
          minBarSpacing: 2,
          fixLeftEdge: true,
          timeVisible: true,
        });

        const rsiSeries = rsiChart?.addLineSeries();
        rsiSeries?.applyOptions({
          color: "#FFA500",
          lineWidth: 2,
        });
        if (rsiPoints) {
          rsiSeries?.setData(rsiPoints);
        }

        const handleResize = () => {
          rsiChart?.applyOptions({
            width: window.innerWidth,
          });
        };

        window.addEventListener("resize", handleResize);
      }

      if (adxRef.current) {
        adxChart?.applyOptions({
          layout: {
            background: { color: "#222" },
            textColor: "#DDD",
          },
          grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
          },
          width: window.innerWidth - 20,
          height: 200,
        });

        adxChart?.timeScale().applyOptions({
          borderColor: "#71649C",
          rightOffset: 40,
          barSpacing: 10,
          minBarSpacing: 2,
          fixLeftEdge: true,
          timeVisible: true,
        });

        const adxSeries = adxChart?.addLineSeries();
        adxSeries?.applyOptions({
          color: "#bb320c",
          lineWidth: 2,
        });
        if (adxPoints) {
          adxSeries?.setData(adxPoints);
        }

        const handleResize = () => {
          adxChart?.applyOptions({
            width: window.innerWidth,
          });
        };

        window.addEventListener("resize", handleResize);
      }

      if (aroonRef.current) {
        aroonChart?.applyOptions({
          layout: {
            background: { color: "#222" },
            textColor: "#DDD",
          },
          grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
          },
          width: window.innerWidth - 20,
          height: 200,
        });

        aroonChart?.timeScale().applyOptions({
          borderColor: "#71649C",
          rightOffset: 40,
          barSpacing: 10,
          minBarSpacing: 2,
          fixLeftEdge: true,
          timeVisible: true,
        });

        const aroonUpSeries = aroonChart?.addLineSeries();
        aroonUpSeries?.applyOptions({
          color: "#FFA500",
          lineWidth: 2,
        });
        if (aroonUpData) {
          aroonUpSeries?.setData(aroonUpData);
        }

        const aroonDownSeries = aroonChart?.addLineSeries();
        aroonDownSeries?.applyOptions({
          color: "#bb320c",
          lineWidth: 2,
        });
        if (aroonDownData) {
          aroonDownSeries?.setData(aroonDownData);
        }

        const handleResize = () => {
          rsiChart?.applyOptions({
            width: window.innerWidth,
          });
        };

        window.addEventListener("resize", handleResize);
      }

      chart.priceScale("right").applyOptions({
        borderColor: "#71649C",
        visible: true,
      });

      chart.priceScale("left").applyOptions({
        borderColor: "#71649C",
        visible: false,
      });

      chart.timeScale().applyOptions({
        borderColor: "#71649C",
        rightOffset: 40,
        barSpacing: 10,
        minBarSpacing: 2,
        fixLeftEdge: true,
        timeVisible: true,
      });

      const candleSeries = chart.addCandlestickSeries();
      candleSeries.applyOptions({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
        priceScaleId: "right",
      });
      if (candlestickData) {
        candleSeries.setData(candlestickData);
      }
      chart.subscribeCrosshairMove((param) => {
        if (param.time) {
          const data = param.seriesData.get(candleSeries);
          if (data) {
            setCandlePrice(data as CandlestickData<Time>);
          }
        }
      });

      const volumeSeries = chart.addHistogramSeries({
        color: "#26a69a",
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
      });

      volumeSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });

      if (volumeData) {
        volumeSeries.setData(volumeData);
      }

      const smaSeries = chart.addLineSeries();
      smaSeries.applyOptions({
        color: "#FFA500",
        lineWidth: 2,
      });
      if (smaPoints) {
        smaSeries.setData(smaPoints);
      }

      const handleResize = () => {
        chart.applyOptions({
          width: window.innerWidth,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        chart.remove();
        rsiChart?.remove();
        adxChart?.remove();
        aroonChart?.remove();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [candlestickData, smaPoints, rsiPoints, adxPoints, aroonData]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSymbol(search);
  };

  return (
    <div>
      <div className="flex items-center justify-between px-10 pb-4 pt-4">
        <div className="flex items-center gap-8 text-muted-foreground">
          <form onSubmit={handleSearch} className=" ">
            <div className="relative flex items-center gap-2">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="bg-zinc-800 text-white w-[300px]"
                placeholder="Enter the Ticker (e.g. RELIANCE.BSE/TSCO.LON etc.)"
              />
              <Button type="submit">Search</Button>
            </div>
            <div className=" absolute z-50  shadow-md p-1 w- mt-2 rounded bg-zinc-800 ">
              {tickers &&
                tickers.map((ticker, index) => (
                  <h2
                    key={index}
                    onClick={() => {
                      setSymbol(ticker.symbol)
                      setTickers(undefined)
                    }}
                    className=" p-3  hover:bg-zinc-700 text-white cursor-pointer truncate rounded text-wrap"
                  >
                    {ticker.name}
                  </h2>
                ))}
            </div>
          </form>
          <Button
            variant={indicator === "SMA" || smaData ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => {
              if (indicator === "SMA") {
                setIndicator("NULL");
                setSmaData(undefined);
              } else {
                setIndicator("SMA");
              }
            }}
          >
            <AreaChart />
            <p>SMA (10)</p>
          </Button>
          <Button
            variant={indicator === "RSI" || rsiData ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => {
              if (indicator === "RSI") {
                setIndicator("NULL");
                setRsiData(undefined);
              } else {
                setIndicator("RSI");
              }
            }}
          >
            <LineChart />
            <p>RSI</p>
          </Button>
          <Button
            variant={indicator === "ADX" || adxData ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => {
              if (indicator === "ADX") {
                setIndicator("NULL");
                setAdxData(undefined);
              } else {
                setIndicator("ADX");
              }
            }}
          >
            <ScatterChart />
            <p>ADX</p>
          </Button>
          <Button
            variant={indicator === "AROON" || aroonData ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => {
              if (indicator === "AROON") {
                setIndicator("NULL");
                setAroonData(undefined);
              } else {
                setIndicator("AROON");
              }
            }}
          >
            <BarChartBig />
            <p>Aroon</p>
          </Button>

          <Button
            variant={indicator === "NONE" ? "default" : "ghost"}
            className="flex items-center gap-2"
            onClick={() => {
              setAdxData(undefined);
              setAroonData(undefined);
              setRsiData(undefined);
              setSmaData(undefined);
              setIndicator("NONE");
            }}
          >
            <X />
            <p>Remove</p>
          </Button>
        </div>
        <div>
          {indicatorLoading && (
            <Loader2 className="animate-spin h-10 w-10 text-muted-foreground" />
          )}
          {indicatorError && (
            <div className="flex items-center gap-2">
              <CircleX className="h-10 w-10 text-red-500" />
              <p>Error Occured</p>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        {loading ? (
          <div className="">
            <Loader2 className="animate-spin h-10 w-10 text-muted-foreground" />
          </div>
        ) : (
          <>
            <div ref={chartRef} className="" style={{ width: "100%" }}>
              <div className="fixed z-20 flex text-white ml-4 px-1 bg-zinc-600 w-fit rounded">
                <p className="text-green-600 mr-1">{symbol}</p>
                {candlePrice && (
                  <>
                    |
                    <div className="mr-2 ml-1">OPEN : {candlePrice?.open},</div>
                    <div className="mr-2">HIGH : {candlePrice?.high},</div>
                    <div className="mr-2">LOW : {candlePrice?.low},</div>
                    <div className="mr-2">CLOSE : {candlePrice?.close}</div>
                  </>
                )}
              </div>
            </div>
            {rsiData && <div ref={rsiRef}></div>}
            {adxData && <div ref={adxRef}></div>}
            {aroonData && <div ref={aroonRef}></div>}
          </>
        )}
      </div>
    </div>
  );
};

export default LWCChart;
