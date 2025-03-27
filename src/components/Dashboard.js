import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AuthStyles.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const saloons = [
    { id: 1, name: "Saloon 01" },
    { id: 2, name: "Saloon 02" },
    { id: 3, name: "Saloon 03" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      setSuccessMessage(true);
      // Hide the banner after 5 seconds
      const timer = setTimeout(() => setSuccessMessage(false), 5000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [location.state]);

  const handleSaloonSelect = (saloonId) => {
    setSuccessMessage(false); // Clear message on new selection
    navigate(`/services/${saloonId}`);
  };

  if (loading) {
    return (
      <div className="auth-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {successMessage && (
        <div className="success-banner">
          Appointment requested successfully!
        </div>
      )}
      <div className="auth-box dashboard-box">
        <h1 className="brand-title">Athywas</h1>
        <p className="tagline">Your Beauty Booking Solution</p>
        <h2 className="section-title">Select a Saloon</h2>
        <ul className="saloon-list">
          {saloons.map((saloon) => (
            <li
              key={saloon.id}
              className="saloon-item"
              onClick={() => handleSaloonSelect(saloon.id)}
            >
              {saloon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;