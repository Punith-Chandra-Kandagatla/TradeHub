import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../components/formatCurrency";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [availableQty, setAvailableQty] = useState(0);
  const totalAmount = stockQuantity * stockPrice;

  const { closeSellWindow, refreshData } = useContext(GeneralContext);
  // const handleBuyClick = () => {
  //   axios.post("https://tradehub-backend-aa95.onrender.com/newOrder", {
  //     name: uid,
  //     qty: stockQuantity,
  //     price: stockPrice,
  //     mode: "BUY",
  //   });

  //   GeneralContext.closeBuyWindow();
  // };

  useEffect(() => {
  axios
    .get("https://tradehub-backend-aa95.onrender.com/allHoldings", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      const holding = res.data.find(
        (item) => item.name === uid
      );

      if (holding) {
        setAvailableQty(holding.qty);
      }

      axios
        .get(`https://tradehub-backend-aa95.onrender.com/stock/${uid}`)
        .then((res) => {
          setStockPrice(res.data.price);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}, [uid]);

  const handleBuyClick = async () => {
    if (Number(stockQuantity) > availableQty) {
      alert(
        `You only have ${availableQty} shares available`
      );
      return;
    }

    console.log("MODE =", "SELL");
    console.log("QTY =", stockQuantity);
    console.log("PRICE =", stockPrice);
  try {
    console.log("Sending order...");

    const response = await axios.post(
      "https://tradehub-backend-aa95.onrender.com/newOrder",
      {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL",
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
    closeSellWindow();
  } catch (err) {
    console.error("Order Error:", err);

    if (err.response) {
      console.log("Response Data:", err.response.data);
      console.log("Status:", err.response.status);
    }

    alert(err.response?.data?.message || "Order Failed!");
  }
};

  const handleCancelClick = () => {
    closeSellWindow();
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
            <legend>Price</legend>
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

      <p
        style={{
          marginLeft: "15px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Available: {availableQty} shares
      </p>

      <div className="buttons">
        <span>Order Value {formatCurrency(totalAmount)}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;