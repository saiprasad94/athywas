import logo from "../assets/athywas-logo.png";

const Dashboard = () => {
  return (
    <div className="auth-container">
      <div className="auth-box dashboard-box">
        <img src={logo} alt="Athywas Logo" className="brand-logo" />
        <p className="tagline">Your Salon Booking Solution</p>
        <h2 className="coming-soon">We are coming soon!</h2>
        <p className="info-text">
          Stay tuned for an amazing experience. We're working hard to bring you the best salon services.
        </p>
      </div>
    </div>
  );
};