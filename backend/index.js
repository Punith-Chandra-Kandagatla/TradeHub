require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const jwt = require("jsonwebtoken");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const StocksModel = require("./model/StocksModel");
const { UserModel } = require("./model/UserModel");
const authMiddleware = require("./middleware/authMiddleware");
const { FundsHistoryModel } = require("./model/FundsHistoryModel");

const PORT = process.env.PORT || 3002;

console.log(process.env.MONGO_URL);
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({
      userId: req.user.userId,
    });

    const stocks = await StocksModel.find();

    const stockMap = {};

    stocks.forEach((stock) => {
      stockMap[stock.name] = stock;
    });

    const updatedHoldings = allHoldings.map((holding) => {
      const marketStock = stockMap[holding.name];

      if (marketStock) {
        return {
          ...holding.toObject(),
          price: marketStock.price,
          day: marketStock.percent,
          isLoss: marketStock.isDown,
        };
      }

      return holding;
    });

    res.json(updatedHoldings);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/allPositions",authMiddleware,  async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// app.post("/newOrder", async (req, res) => {
//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   newOrder.save();

//   res.send("Order saved!");
// });

// app.post("/newOrder", async (req, res) => {
//   console.log("Received Order:", req.body);

//   let newOrder = new OrdersModel({
//     name: req.body.name,
//     qty: req.body.qty,
//     price: req.body.price,
//     mode: req.body.mode,
//   });

//   await newOrder.save();

//   console.log("Order Saved!");

//   res.send("Order saved!");
// });

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    console.log("Received Order:", req.body);

    const user = await UserModel.findById(
  req.user.userId
);

const orderCost =
  Number(req.body.qty) *
  Number(req.body.price);


console.log("User Balance:", user.balance);
console.log("Order Cost:", orderCost);

  if (
  req.body.mode === "BUY" &&
  orderCost > user.balance
) {
  return res.status(400).json({
    message: "Insufficient available balance",
  });
}

    let newOrder = new OrdersModel({
      userId: req.user.userId,
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    console.log(newOrder);

    await newOrder.save();
    const holding = await HoldingsModel.findOne({
      userId: req.user.userId,
      name: req.body.name,
    });

    if (holding) {
  const orderQty = Number(req.body.qty);
  const orderPrice = Number(req.body.price);

  if (req.body.mode === "BUY") {
    const oldQty = holding.qty;
    const oldAvg = holding.avg;

    const newQty = oldQty + orderQty;

    const newAvg =
      ((oldAvg * oldQty) +
        (orderPrice * orderQty)) /
      newQty;

      holding.qty = newQty;
      holding.avg = Number(newAvg.toFixed(2));
      user.balance -= orderCost;
await user.save();
    }

    if (req.body.mode === "SELL") {
  if (orderQty > holding.qty) {
    return res.status(400).json({
      message: "Cannot sell more than owned quantity",
    });
  }

  holding.qty -= orderQty;

  user.balance += orderCost;
  await user.save();

  if (holding.qty === 0) {
    await HoldingsModel.deleteOne({
      _id: holding._id,
    });

    return res.send("Order saved!");
  }
}

    await holding.save();
  }else {
  if (req.body.mode === "BUY") {
    const buyPrice = Number(req.body.price);

const marketPrice =
  buyPrice * (0.95 + Math.random() * 0.15);

const netChange =
  (
    ((marketPrice - buyPrice) / buyPrice) *
    100
  ).toFixed(2) + "%";

  const dayChange =
(
  (-2 + Math.random() * 4)
).toFixed(2) + "%";

let newHolding = new HoldingsModel({
  userId: req.user.userId,
  name: req.body.name,
  qty: Number(req.body.qty),
  avg: buyPrice,

  price: Number(marketPrice.toFixed(2)),
  net: netChange,
  day: dayChange,
});
    user.balance -= orderCost;
await user.save();
    await newHolding.save();
  }
}

    console.log("Order Saved!");

    res.send("Order saved!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// app.listen(PORT, () => {
//   console.log("App started!");
//   mongoose.connect(uri);
//   console.log("DB started!");
// });

const bcrypt = require("bcryptjs");

app.post("/signup", async (req, res) => {
  console.log("Signup route hit!");
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

      const token = jwt.sign(
        {
        userId: newUser._id,
        email: newUser.email,
        },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
      );

      res.status(201).json({
  message: "User registered successfully",
  token,
  username: newUser.username,
});
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/balance", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await UserModel.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    console.log("BALANCE ROUTE HIT");
    res.status(200).json({
      openingBalance: user.openingBalance,
      balance: user.balance,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/addFunds", async (req, res) => {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const { amount } = req.body;

    const user = await UserModel.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.balance += Number(amount);
    user.openingBalance += Number(amount);
    await user.save();

    await FundsHistoryModel.create({
  userId: user._id,
  type: "ADD",
  amount,
});

    res.status(200).json({
      message: "Funds added successfully",
      balance: user.balance,
      openingBalance: user.openingBalance,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/withdrawFunds", async (req, res) => {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const { amount } = req.body;

    const user = await UserModel.findById(
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (Number(amount) > user.balance) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    user.balance -= Number(amount);

    await user.save();

    await FundsHistoryModel.create({
  userId: user._id,
  type: "WITHDRAW",
  amount,
});

    res.status(200).json({
      message: "Funds withdrawn successfully",
      balance: user.balance,
      openingBalance: user.openingBalance,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  let allOrders = await OrdersModel.find({
    userId: req.user.userId,
  });

  res.json(allOrders);
});

setInterval(async () => {
  try {
    const stocks = await StocksModel.find();

    for (let stock of stocks) {
      const currentPrice = stock.price;

      const changePercent =
        (Math.random() * 4 - 2) / 100;

      const newPrice =
        currentPrice * (1 + changePercent);

      stock.price = Number(
        newPrice.toFixed(2)
      );

      stock.percent =
        (changePercent * 100).toFixed(2) + "%";

      stock.isDown = changePercent < 0;

      await stock.save();
    }

    console.log("Stock market updated");
  } catch (err) {
    console.log(err);
  }
}, 30000);

app.get("/seedStocks", async (req, res) => {
  try {
    await StocksModel.deleteMany({});

    await StocksModel.insertMany([
      {
        name: "INFY",
        price: 1555.45,
        percent: "-1.60%",
        isDown: true,
      },
      {
        name: "ONGC",
        price: 116.8,
        percent: "-0.09%",
        isDown: true,
      },
      {
        name: "TCS",
        price: 3194.8,
        percent: "-0.25%",
        isDown: true,
      },
      {
        name: "KPITTECH",
        price: 266.45,
        percent: "3.54%",
        isDown: false,
      },
      {
        name: "QUICKHEAL",
        price: 308.55,
        percent: "-0.15%",
        isDown: true,
      },
      {
        name: "WIPRO",
        price: 577.75,
        percent: "0.32%",
        isDown: false,
      },
      {
        name: "M&M",
        price: 779.8,
        percent: "-0.01%",
        isDown: true,
      },
      {
        name: "RELIANCE",
        price: 2112.4,
        percent: "1.44%",
        isDown: false,
      },
      {
        name: "HUL",
        price: 512.4,
        percent: "1.04%",
        isDown: false,
      },
    ]);

    res.send("Stocks Seeded!");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/allStocks", async (req, res) => {
  try {
    const stocks = await StocksModel.find();
    res.json(stocks);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/stock/:name", async (req, res) => {
  try {
    const stock = await StocksModel.findOne({
      name: req.params.name,
    });

    res.json(stock);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/fundsHistory", authMiddleware, async (req, res) => {
  try {
    const history = await FundsHistoryModel.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected successfully!");

    app.listen(PORT, () => {
      console.log("App started!");
    });
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });