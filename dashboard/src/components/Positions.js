import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency } from "../components/formatCurrency";
const Positions = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3002/allHoldings", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const pnl = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment > 0
      ? ((pnl / totalInvestment) * 100).toFixed(2)
      : 0;

  const bestStock =
    allHoldings.length > 0
      ? allHoldings.reduce((best, stock) => {
          const currentReturn =
            ((stock.price - stock.avg) / stock.avg) * 100;

          const bestReturn =
            ((best.price - best.avg) / best.avg) * 100;

          return currentReturn > bestReturn
            ? stock
            : best;
        })
      : null;

  const worstStock =
    allHoldings.length > 0
      ? allHoldings.reduce((worst, stock) => {
          const currentReturn =
            ((stock.price - stock.avg) / stock.avg) * 100;

          const worstReturn =
            ((worst.price - worst.avg) / worst.avg) * 100;

          return currentReturn < worstReturn
            ? stock
            : worst;
        })
      : null;
  const theme = document.body.classList.contains("dark-mode")
  ? "dark"
  : "light";
  
  return (
    <>
      <h3 className="title">Analytics</h3>
      <div className="analytics-grid">

<div className={`analytics-card ${theme}`}>
  <h4>Total Investment</h4>
  <h2>{formatCurrency(totalInvestment)}</h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>Current Value</h4>
  <h2>{formatCurrency(currentValue)}</h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>Overall P&L</h4>
  <h2 className={pnl >= 0 ? "profit" : "loss"}>
    {pnl >= 0 ? "+" : ""}{formatCurrency(pnl)}
  </h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>P&L Percentage</h4>
  <h2 className={pnl >= 0 ? "profit" : "loss"}>
    {pnlPercent}%
  </h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>Stocks Owned</h4>
  <h2>{allHoldings.length}</h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>Best Performer</h4>
  <h2>{bestStock?.name}</h2>
</div>

<div className={`analytics-card ${theme}`}>
  <h4>Worst Performer</h4>
  <h2>{worstStock?.name}</h2>
</div>
      </div>
    </>
  );
};

export default Positions;