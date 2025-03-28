import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AuthStyles.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-box dashboard-box">
        <h1 className="brand-title">Athywas</h1>
        <p className="tagline">Your Beauty Booking Solution</p>
        <h2 className="section-title">Booking Confirmed</h2>
        <div className="booking-summary">
          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>
          <p>
            <strong>Saloon:</strong> Saloon {booking.saloonId}
          </p>
          <p>
            <strong>Services:</strong>{" "}
            {booking.services?.map((s) => s.name).join(", ")}
          </p>
          <p>
            <strong>Total:</strong> ₹{booking.totalPrice}
          </p>
          <p>
            <strong>Athywas Price:</strong> ₹{booking.athywasPrice?.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Confirmation;