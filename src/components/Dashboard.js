import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSaloonSelect = (saloonId) => {
    navigate(`/services/${saloonId}`); // Navigate to services page
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