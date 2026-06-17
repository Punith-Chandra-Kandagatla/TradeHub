import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../components/formatCurrency";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
const totalAmount = stockQuantity * stockPrice;
  useEffect(() => {
  axios
    .get(`http://localhost:3002/stock/${uid}`)
    .then((res) => {
      setStockPrice(res.data.price);
    })
    .catch((err) => {
      console.log(err);
    });
}, [uid]);

  const { closeBuyWindow, refreshData } = useContext(GeneralContext);
  // const handleBuyClick = () => {
  //   axios.post("http://localhost:3002/newOrder", {
  //     name: uid,
  //     qty: stockQuantity,
  //     price: stockPrice,
  //     mode: "BUY",
  //   });

  //   GeneralContext.closeBuyWindow();
  // };

  const handleBuyClick = async () => {
  try {
    console.log("Sending order...");

    const response = await axios.post(
      "http://localhost:3002/newOrder",
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log("Success:", response.data);
    // alert("Order Saved!");

    // GeneralContext.closeBuyWindow();
    refreshData();
    closeBuyWindow();
  } catch (err) {
    console.error("Order Error:", err);

    if (err.response) {
      console.log("Response Data:", err.response.data);
      console.log("Status:", err.response.status);
    }

    alert("Insufficient Amount");
  }
};

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>LTP</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice}
              readOnly
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Total Amount {formatCurrency(totalAmount)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;