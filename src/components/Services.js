import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AuthStyles.css";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState([]);
  const [user, setUser] = useState(null); // Store full user object
  const navigate = useNavigate();
  const { saloonId } = useParams();

  const services = [
    { id: 1, name: "Hairstyling", price: 250 },
    { id: 2, name: "Manicure", price: 150 },
    { id: 3, name: "Facial", price: 300 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
      } else {
        setUser(currentUser); // Store the full user object
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const toggleServiceSelect = (service) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.id === service.id)) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const calculatePrices = () => {
    const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
    const discount = 0.1; // 10% discount
    const athywasPrice = total * (1 - discount);
    return { total, athywasPrice };
  };

  const handleBooking = async () => {
    if (selectedServices.length === 0 || !user) return;

    const { total, athywasPrice } = calculatePrices();

    try {
      await addDoc(collection(db, "appointments"), {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null, // Optional, if set in Firebase Auth
        },
        saloonId: Number(saloonId),
        services: selectedServices.map((s) => ({ name: s.name, price: s.price })),
        totalPrice: total,
        athywasPrice: athywasPrice,
        timestamp: new Date().toISOString(),
        status: "pending",
      });
      console.log("Appointment booked with services:", selectedServices);
      navigate("/dashboard", { state: { bookingSuccess: true } });
    } catch (error) {
      console.error("Booking error:", error);
    }
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
              className={`service-item ${selectedServices.some((s) => s.id === service.id) ? "selected" : ""}`}
              onClick={() => toggleServiceSelect(service)}
            >
              {service.name} - ₹{service.price}
            </li>
          ))}
        </ul>
        {selectedServices.length > 0 && (
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            {selectedServices.map((service) => (
              <p key={service.id}>
                {service.name}: ₹{service.price}
              </p>
            ))}
            <p>Total: ₹{calculatePrices().total}</p>
            <p>Athywas Price: ₹{calculatePrices().athywasPrice.toFixed(2)}</p>
            <button className="book-button" onClick={handleBooking}>
              Request Appointment
            </button>
          </div>
        )}
        <button className="back-button" onClick={() => navigate("/dashboard")}>
          Back to Saloons
        </button>
      </div>
    </div>
  );
};

export default Services;