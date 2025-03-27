import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";
import logo from "../assets/athywas-logo.png"; // Import the logo

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="auth-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box dashboard-box">
        <img src={logo} alt="Athywas Logo" className="brand-logo" />
        <p className="tagline">Your Beauty Booking Solution</p>
        <h2 className="coming-soon">We are coming soon!</h2>
        <p className="info-text">
          Stay tuned for an amazing experience. We're working hard to bring you the best beauty services.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;