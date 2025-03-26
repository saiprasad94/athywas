import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("Auth at render:", auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Signup attempt with:", { email, password });
    if (!auth) {
      setError("Firebase Auth not initialized");
      console.error("Auth is undefined");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success:", userCredential.user);
      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err.code, err.message, err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account? <a href="/signin">Sign in</a>
      </p>
    </div>
  );
};

export default Signup;