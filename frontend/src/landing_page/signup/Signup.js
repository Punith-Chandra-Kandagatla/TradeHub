import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tradehub-backend-aa95.onrender.com/signup",
        {
          username,
          email,
          password,
        }
      );

      console.log(response.data);
      
      localStorage.setItem(
        "token",
      response.data.token
      );

      localStorage.setItem(
  "username",
  response.data.username
);

      alert(response.data.message);
      console.log(response.data);

    window.location.href =
  `http://localhost:3001?token=${response.data.token}&username=${username}`;
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
  <div className="signup-container">
    <div className="signup-box">
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          Sign Up
        </button>
      </form>
    </div>
  </div>
);
};

export default Signup;