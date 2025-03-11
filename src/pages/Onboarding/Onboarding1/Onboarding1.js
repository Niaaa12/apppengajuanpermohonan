import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";
import img1 from "../../../assets/undraw_add-information_06qr.png";

const Onboarding1 = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <img src={img1} alt="Step 1" className="onboarding-img" />
      <div className="onboarding-card">
        <h2>Ajukan Bantuan dengan Mudah</h2>
        <p>Dapatkan bantuan yang Anda butuhkan dengan proses pengajuan yang lebih cepat dan transparan.</p>
        <button onClick={() => navigate("/Onboarding2")}>Next</button>
      </div>
      
    </div>
  );
};

export default Onboarding1;
