import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatCurrency } from "../components/formatCurrency";

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
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

  return (
    <>
      <div className="username">
        <h6>Hi, {localStorage.getItem("username")}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(currentValue)}</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>

            <p>
              Opening balance{" "}
              <span>{formatCurrency(currentValue)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {formatCurrency(pnl)}
              <small> {pnlPercent}%</small>
            </h3>

            <p>P&L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{formatCurrency(currentValue)}</span>
            </p>

            <p>
              Investment{" "}
              <span>{formatCurrency(totalInvestment)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;