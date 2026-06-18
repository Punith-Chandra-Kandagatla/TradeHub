import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { formatCurrency } from "../components/formatCurrency";

const Funds = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [fundsHistory, setFundsHistory] = useState([]);

  const { refreshFlag, refreshData } = useContext(GeneralContext);

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

  axios
    .get("https://tradehub-backend-aa95.onrender.com/balance", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log("Balance API:", res.data);
  setOpeningBalance(res.data.openingBalance);
  setAvailableBalance(res.data.balance);
})
    .catch((err) => {
      console.log(err);
    });

    axios
  .get("https://tradehub-backend-aa95.onrender.com/fundsHistory", {
    headers: {
      Authorization: token,
    },
  })
  .then((res) => {
    setFundsHistory(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

}, [refreshFlag]);

  const theme = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";

  // // Starting capital
  // const openingBalance = 50000;

  // Amount invested in holdings
  const investedAmount = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  // Current portfolio value
  const portfolioValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  // Cash remaining
  // const availableBalance = openingBalance - investedAmount;

  // Overall account value
  const totalAccountValue = availableBalance + portfolioValue;

  const handleAddFunds = async () => {
    if (!amount || Number(amount) <= 0) {
  alert("Please enter a valid amount");
  return;
}
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://tradehub-backend-aa95.onrender.com/addFunds",
      {
        amount: Number(amount),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setOpeningBalance(res.data.openingBalance);
setAvailableBalance(res.data.balance);
refreshData();
    setAmount("");
    
    alert("Funds added successfully!");
  } catch (err) {
    console.log(err);
  }
};

  const handleWithdrawFunds = async () => {
    if (!amount || Number(amount) <= 0) {
  alert("Please enter a valid amount");
  return;
}
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "https://tradehub-backend-aa95.onrender.com/withdrawFunds",
      {
        amount: Number(amount),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setOpeningBalance(res.data.openingBalance);
setAvailableBalance(res.data.balance);
refreshData();

    setAmount("");

    alert("Funds withdrawn successfully!");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Withdrawal failed"
    );
  }
};

  return (
    <>

      <div className="fund-buttons">
  <button
    className="btn btn-blue"
    onClick={() => setShowAddModal(true)}
  >
    Add Funds
  </button>

  <button
    className="btn btn-red"
    onClick={() => setShowWithdrawModal(true)}
  >
    Withdraw Funds
  </button>
</div>

      <h3 className="title fund-modal-title">Funds</h3>

      <div className="analytics-grid">

        {showAddModal && (
  <div className="modal-overlay">
    <div className={`fund-modal ${theme}`}>
      <h3 className="fund-modal-title">
  Add Funds
</h3>

<input
  type="number"
  placeholder="Enter amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

      <button
        className="btn btn-blue"
        onClick={() => {
          handleAddFunds();
          setShowAddModal(false);
        }}
      >
        Add Funds
      </button>

      <button
        className="btn"
        onClick={() => setShowAddModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

{showWithdrawModal && (
  <div className="modal-overlay">
    <div className={`fund-modal ${theme}`}>
      <h3 className="fund-modal-title">
        Withdraw Funds
      </h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="btn btn-red"
        onClick={() => {
          handleWithdrawFunds();
          setShowWithdrawModal(false);
        }}
      >
        Withdraw
      </button>

      <button
        className="btn"
        onClick={() => setShowWithdrawModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}

        <div className={`analytics-card ${theme}`}>
          <h4>Opening Balance</h4>
          <h2>{formatCurrency(openingBalance)}</h2>
        </div>

        <div className={`analytics-card ${theme}`}>
          <h4>Invested Amount</h4>
          <h2>{formatCurrency(investedAmount)}</h2>
        </div>

        <div className={`analytics-card ${theme}`}>
          <h4>Available Balance</h4>
          <h2>{formatCurrency(availableBalance)}</h2>
        </div>

        <div className={`analytics-card ${theme}`}>
          <h4>Portfolio Value</h4>
          <h2>{formatCurrency(portfolioValue)}</h2>
        </div>

        <div className={`analytics-card ${theme}`}>
          <h4>Total Account Value</h4>
          <h2>{formatCurrency(totalAccountValue)}</h2>
        </div>

      </div>

      <h3 className="title">
  Funds Transaction History
</h3>

<div className="order-table">
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Amount</th>
        <th>Date & Time</th>
      </tr>
    </thead>

    <tbody>
      {fundsHistory.map((item, index) => (
        <tr key={index}>
          <td
            className={
              item.type === "ADD"
                ? "profit"
                : "loss"
            }
          >
            {item.type}
          </td>

          <td>
            {formatCurrency(item.amount)}
          </td>

          <td>
  {new Date(item.createdAt).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
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
    </>
  );
};

export default Funds;