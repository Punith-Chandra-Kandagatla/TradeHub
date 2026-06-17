import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

// import { useNavigate } from "react-router-dom";

const Login = () => {
    // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tradehub-backend-aa95.onrender.com/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
      console.log("USERNAME =", response.data.username);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      alert("Login Successful");
        window.location.href =
    `http://localhost:3001?token=${response.data.token}&username=${response.data.username}`;

      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
  <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
);
};

export default Login;