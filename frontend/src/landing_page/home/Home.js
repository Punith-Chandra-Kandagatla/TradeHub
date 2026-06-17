import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>Welcome to TradeHub</h1>

          <p>
            A powerful stock trading simulator designed to help users
            track portfolios, manage holdings, and experience
            realistic market trading.
          </p>

          <div className="hero-buttons">
            <Link to="/signup">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">
                Login
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="media/images/Dashboard.png"
            alt="Dashboard Preview"
          />
        </div>
      </section>

      <section className="features-section">
  <div className="features-header">
    <h2>Why Choose TradeHub?</h2>
    <p>
      Everything you need to experience a realistic
      stock trading environment.
    </p>
  </div>

  <div className="features-grid">
    <div className="feature-card">
      <h3>📈 Market Simulation</h3>
      <p>
        Experience dynamic stock price updates and
        realistic trading behavior.
      </p>
    </div>

    <div className="feature-card">
      <h3>💼 Portfolio Management</h3>
      <p>
        Track holdings, positions, investments,
        and overall portfolio performance.
      </p>
    </div>

    <div className="feature-card">
      <h3>🔒 Secure Authentication</h3>
      <p>
        User accounts are protected through secure
        login and authentication mechanisms.
      </p>
    </div>

    <div className="feature-card">
      <h3>🌙 Dark Mode</h3>
      <p>
        Enjoy a comfortable trading experience with
        both light and dark themes.
      </p>
    </div>
  </div>
</section>

        {/* Section 3 - How It Works */}

<section className="workflow-section">
  <div className="workflow-header">
    <h2>How TradeHub Works</h2>
    <p>
      Get started in just a few simple steps.
    </p>
  </div>

  <div className="workflow-container">

    <div className="workflow-step">
      <div className="step-number">1</div>
      <h3>Create Account</h3>
      <p>
        Register your account and securely access
        your personalized trading dashboard.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">2</div>
      <h3>Login</h3>
      <p>
        Sign in and explore your watchlist,
        holdings, and positions.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">3</div>
      <h3>Trade Stocks</h3>
      <p>
        Buy and sell stocks using a realistic
        trading workflow.
      </p>
    </div>

    <div className="workflow-arrow">→</div>

    <div className="workflow-step">
      <div className="step-number">4</div>
      <h3>Track Portfolio</h3>
      <p>
        Monitor holdings, positions, and
        portfolio performance.
      </p>
    </div>

  </div>
</section>

<section className="feature-section">

  <div className="feature-row">
    <div className="feature-content">
      <h2>Smart Watchlist</h2>
      <p>
        Track stocks in real time with live price updates,
        percentage changes and intuitive watchlist management.
      </p>
    </div>

    <div className="feature-image">
      <img
        src="media/images/watchlist.png"
        alt="Watchlist"
        className="watchlist-img"
      />
    </div>
  </div>

  <div className="feature-row reverse">
    <div className="feature-content">
      <h2>Portfolio Holdings</h2>
      <p>
        Monitor investments, current value,
        profit and loss with a clean dashboard.
      </p>
    </div>

    <div className="feature-image">
      <img
        src="media/images/holdings.png"
        alt="Holdings"
      />
    </div>
  </div>

  <div className="feature-row">
    <div className="feature-content">
      <h2>Order Management</h2>
      <p>
        View and track all buy and sell transactions
        through an organized order management system.
      </p>
    </div>

    <div className="feature-image">
      <img
        src="media/images/orders.png"
        alt="Orders"
      />
    </div>
  </div>

</section>

<section className="cta-section">
  <h2>Ready to Start Trading?</h2>

  <p>
    Create an account and experience portfolio tracking,
    watchlists, and stock trading simulations with TradeHub.
  </p>

  <Link to="/signup" className="cta-btn">
    Get Started
  </Link>
</section>
    </>
  );
};

export default Home;