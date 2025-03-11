import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";
import img3 from "../../../assets/undraw_online-messaging_gjnh.png";

const Onboarding3 = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <img src={img3} alt="Step 3" className="onboarding-img" />
      <div className="onboarding-card">
        <h2>Terhubung dengan Layanan Baznas</h2>
        <p>Nikmati kemudahan komunikasi langsung dengan tim kami untuk memastikan bantuan sampai tepat sasaran.</p>
        <button onClick={() => navigate("/Login")}>Sign In</button>
      </div>
      
    </div>
  );
};

export default Onboarding3;
