import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement } from "chart.js";
import { StockContext } from "../context/Stocklistcontext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement // For doughnut chart
);

// Dummy data
const dummyRecTrends = {
  AAPL: [
    { period: "Jan", strongSell: 2, sell: 3, hold: 13, buy: 26, strongBuy: 14 },
    { period: "Feb", strongSell: 1, sell: 3, hold: 12, buy: 25, strongBuy: 12 },
    { period: "Mar", strongSell: 1, sell: 2, hold: 13, buy: 24, strongBuy: 13 },
    { period: "Apr", strongSell: 2, sell: 2, hold: 14, buy: 26, strongBuy: 15 },
    { period: "May", strongSell: 1, sell: 3, hold: 12, buy: 23, strongBuy: 12 },
  ],
  APL: [
    { period: "Jan", strongSell: 2, sell: 3, hold: 13, buy: 26, strongBuy: 14 },
    { period: "Feb", strongSell: 1, sell: 3, hold: 12, buy: 25, strongBuy: 12 },
    { period: "Mar", strongSell: 1, sell: 2, hold: 13, buy: 24, strongBuy: 13 },
    { period: "Apr", strongSell: 2, sell: 2, hold: 14, buy: 26, strongBuy: 15 },
    { period: "May", strongSell: 1, sell: 3, hold: 12, buy: 23, strongBuy: 12 },
  ],
  AA: [
    { period: "Jan", strongSell: 2, sell: 3, hold: 13, buy: 26, strongBuy: 14 },
    { period: "Feb", strongSell: 1, sell: 3, hold: 12, buy: 25, strongBuy: 12 },
    { period: "Mar", strongSell: 1, sell: 2, hold: 13, buy: 24, strongBuy: 13 },
    { period: "Apr", strongSell: 2, sell: 2, hold: 14, buy: 26, strongBuy: 15 },
    { period: "May", strongSell: 1, sell: 3, hold: 12, buy: 23, strongBuy: 12 },
  ],
vxn: [
    { period: "Jan", strongSell: 2, sell: 3, hold: 13, buy: 26, strongBuy: 14 },
    { period: "Feb", strongSell: 1, sell: 3, hold: 12, buy: 25, strongBuy: 12 },
    { period: "Mar", strongSell: 1, sell: 2, hold: 13, buy: 24, strongBuy: 13 },
    { period: "Apr", strongSell: 2, sell: 2, hold: 14, buy: 26, strongBuy: 15 },
    { period: "May", strongSell: 1, sell: 3, hold: 12, buy: 23, strongBuy: 12 },
  ],
  
  // Other tickers...
};

// Color codes for each recommendation
const COLORS = {
  strongSell: "rgba(220,38,38,0.3)",
  sell: "rgba(249,115,71,0.3)",
  hold: "rgba(251,191,36,0.3)",
  buy: "rgba(59,130,246,0.3)",
  strongBuy: "rgba(16,185,129,0.3)",
};

export default function Performance() {
  const { stocks } = useContext(StockContext);
  const tickers = stocks.map((s) => s.title); // Get first 5 stock tickers
  const symbols = tickers.length ? tickers : Object.keys(dummyRecTrends); // Use dummy data if no stocks in context

  return (
    <div className="grid md:grid-cols-4 gap-4 max-h-screen overflow-auto">
      {symbols.map((sym) => {
        const recs = dummyRecTrends[sym] || dummyRecTrends.AAPL; // Get stock recommendations for each symbol
        const labels = ["Strong Sell", "Sell", "Hold", "Buy", "Strong Buy"]; // Labels for the doughnut chart

        // Prepare data for the doughnut chart
        const dataValues = [
          recs.reduce((sum, rec) => sum + rec.strongSell, 0),
          recs.reduce((sum, rec) => sum + rec.sell, 0),
          recs.reduce((sum, rec) => sum + rec.hold, 0),
          recs.reduce((sum, rec) => sum + rec.buy, 0),
          recs.reduce((sum, rec) => sum + rec.strongBuy, 0),
        ];

        const chartData = {
          labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: [
                COLORS.strongSell,
                COLORS.sell,
                COLORS.hold,
                COLORS.buy,
                COLORS.strongBuy,
              ],
              borderColor: [
                COLORS.strongSell.replace(/0\.3/, "1"),
                COLORS.sell.replace(/0\.3/, "1"),
                COLORS.hold.replace(/0\.3/, "1"),
                COLORS.buy.replace(/0\.3/, "1"),
                COLORS.strongBuy.replace(/0\.3/, "1"),
              ],
              borderWidth: 1,
            },
          ],
        };

        // Chart options
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false, // Always show legend
              position: "top",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 8,
                padding: 12,
                color: "#fff",
                font: { size: 10 },
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
            title: {
              display: false,
            },
          },
        };

        return (
          <div key={sym} className="bg-gray-900 p-2 rounded-lg">
            <p className="text-white text-sm font-medium mb-1">{sym}</p>
            <div style={{ height: "100px", width: "100%", }}>
              <Doughnut data={chartData} options={options} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
