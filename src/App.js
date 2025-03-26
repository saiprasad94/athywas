import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard"; // Placeholder for now

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Signin />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;