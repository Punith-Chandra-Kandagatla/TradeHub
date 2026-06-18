import React, { useState, useEffect, useContext } from "react";
import { formatCurrency } from "../components/formatCurrency";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { refreshFlag } = useContext(GeneralContext);
  useEffect(() => {
  const fetchHoldings = () => {
    const token = localStorage.getItem("token");

    axios
      .get("https://tradehub-backend-aa95.onrender.com/allHoldings", {
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
  };

  fetchHoldings();

  const interval = setInterval(() => {
    fetchHoldings();
  }, 30000);

  return () => clearInterval(interval);
}, [refreshFlag]);

  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // Portfolio Summary Calculations
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

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnlValue =
                curValue - stock.avg * stock.qty;

              const isProfit = pnlValue >= 0;
              const profClass = isProfit
                ? "profit"
                : "loss";

              const dayClass =
                stock.day && stock.day.includes("-")
                  ? "loss"
                  : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{formatCurrency(stock.avg)}</td>
                  <td>{formatCurrency(stock.price)}</td>
                  <td>{formatCurrency(curValue)}</td>

                  <td className={profClass}>
                    {formatCurrency(pnlValue)}
                  </td>

                  <td className={profClass}>
                    {stock.net}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{formatCurrency(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{formatCurrency(currentValue)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5
            className={
              pnl >= 0
              ? "profit"
              : "loss"
            }
          >
            {pnl >= 0 ? "+" : ""}
            {formatCurrency(pnl)} ({pnlPercent}%)
          </h5>
        <p>P&L</p>
          </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;