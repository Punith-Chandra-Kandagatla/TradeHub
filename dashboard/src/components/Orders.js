import React, { useEffect, useState, useContext } from "react";
import { formatCurrency } from "../components/formatCurrency";
import GeneralContext from "./GeneralContext";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { refreshFlag } = useContext(GeneralContext);
  useEffect(() => {
    axios
      .get("https://tradehub-backend-aa95.onrender.com/allOrders", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshFlag]);

  return (
    <div>
      <h3 className="title">
        Orders ({orders.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{formatCurrency(order.price)}</td>
                <td
                  className={
                    order.mode === "BUY"
                      ? "profit"
                      : "loss"
                  }
                >
                  {order.mode}
                </td>
                <td>
  {new Date(order.createdAt).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  )}
</td>

                <td>
  {new Date(order.createdAt).toLocaleString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;