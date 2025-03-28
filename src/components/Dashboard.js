import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import "../styles/AuthStyles.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState(null);
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
      } else {
        setUserId(user.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userId) {
      const fetchAppointments = async () => {
        try {
          const q = query(collection(db, "appointments"), where("user.uid", "==", userId));
          const querySnapshot = await getDocs(q);
          const userAppointments = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter((appt) => appt.status !== "cancelled"); // Filter out cancelled
          setAppointments(userAppointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      fetchAppointments();
    }
  }, [userId]);

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      setSuccessMessage(true);
      const timer = setTimeout(() => setSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleSaloonSelect = (saloonId) => {
    setSuccessMessage(false);
    navigate(`/services/${saloonId}`);
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { status: "cancelled" });
      // Remove the cancelled appointment from the UI
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
      console.log("Appointment cancelled and removed:", appointmentId);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
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
      {successMessage && (
        <div className="success-banner">
          Appointment requested successfully!
        </div>
      )}
      <div className="auth-box dashboard-box">
        <h1 className="brand-title">Athywas</h1>
        <p className="tagline">Your Beauty Booking Solution</p>
        {appointments.length > 0 && (
          <div className="appointments-section">
            <h2 className="section-title">Your Appointments</h2>
            <ul className="appointment-list">
              {appointments.map((appt) => (
                <li key={appt.id} className="appointment-item">
                  <p>
                    <strong>Saloon {appt.saloonId}</strong> -{" "}
                    {appt.services.map((s) => s.name).join(", ")}
                  </p>
                  <p>Total: ₹{appt.totalPrice} | Athywas Price: ₹{appt.athywasPrice.toFixed(2)}</p>
                  <p>Status: {appt.status}</p>
                  {appt.status === "pending" && (
                    <button
                      className="cancel-button"
                      onClick={() => handleCancelAppointment(appt.id)}
                    >
                      Cancel
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
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