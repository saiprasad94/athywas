import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AuthStyles.css";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { saloonId } = useParams(); // Get saloon ID from URL

  // Sample services data (can be tied to saloonId later)
  const services = [
    { id: 1, name: "Hairstyling", price: 250 },
    { id: 2, name: "Manicure", price: 150 },
    { id: 3, name: "Facial", price: 300 },
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

  const handleServiceSelect = (service) => {
    // Placeholder for future action (e.g., booking)
    console.log("Selected service:", service.name, "Price:", service.price);
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
        <h2 className="section-title">Services at Saloon {saloonId}</h2>
        <ul className="service-list">
          {services.map((service) => (
            <li
              key={service.id}
              className="service-item"
              onClick={() => handleServiceSelect(service)}
            >
              {service.name} - ₹{service.price}
            </li>
          ))}
        </ul>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Saloons
        </button>
      </div>
    </div>
  );
};

export default Services;