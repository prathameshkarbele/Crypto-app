import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { createTheme } from "@mui/system";
import { CategoryScale, registerables, Chart } from "chart.js";

import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { CryptoState } from "../Cryptocontext";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import SelectButton from "./SelectButton";
Chart.register(CategoryScale);
Chart.register(...registerables);
const CoinInfo = ({ coin }) => {
  
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricalData(data.prices);
  };

  console.log("data....", historicalData);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  // const options = {
  //   legend: "none",
  //   bar: { groupWidth: "100%" }, // Remove space between bars.
  //   candlestick: {
  //     fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
  //     risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  //   },
  // };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="Coininfo">
      {/* chart */}
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
           <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
           
              {chartDays.map((day) => (
                <SelectButton 
                  key={day.value}
                  onClick={() => {setDays(day.value)}}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
               ))}
            </div> 
          </> 
        )}
      </div>
    </ThemeProvider>
  );
              };

export default CoinInfo;


