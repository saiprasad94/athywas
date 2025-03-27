import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import "../styles/AuthStyles.css";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { saloonId } = useParams();

  const services = [
    { id: 1, name: "Hairstyling", price: 250 },
    { id: 2, name: "Manicure", price: 150 },
    { id: 3, name: "Facial", price: 300 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/signin");
      } else {
        setUserId(user.uid); // Store user ID for booking
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const calculatePrices = (price) => {
    const total = price; // Could sum multiple services later
    const discount = 0.1; // 10% discount as per your doc
    const athywasPrice = total * (1 - discount);
    return { total, athywasPrice };
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleBooking = async () => {
    if (!selectedService) return;

    const { total, athywasPrice } = calculatePrices(selectedService.price);

    try {
      await addDoc(collection(db, "appointments"), {
        userId,
        saloonId: Number(saloonId),
        serviceName: selectedService.name,
        totalPrice: total,
        athywasPrice: athywasPrice,
        timestamp: new Date().toISOString(),
        status: "pending",
      });
      console.log("Appointment booked!");
      navigate("/dashboard", { state: { bookingSuccess: true } }); // Pass success state
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
              className={`service-item ${selectedService?.id === service.id ? "selected" : ""}`}
              onClick={() => handleServiceSelect(service)}
            >
              {service.name} - ₹{service.price}
            </li>
          ))}
        </ul>
        {selectedService && (
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p>Service: {selectedService.name}</p>
            <p>Total: ₹{calculatePrices(selectedService.price).total}</p>
            <p>Athywas Price: ₹{calculatePrices(selectedService.price).athywasPrice.toFixed(2)}</p>
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