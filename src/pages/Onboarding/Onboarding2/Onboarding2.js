import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";
import img2 from "../../../assets/undraw_visionary-technology_6ouq.png";

const Onboarding2 = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <img src={img2} alt="Step 2" className="onboarding-img" />
      <div className="onboarding-card">
        <h2>Pantau Status Permohonan Anda</h2>
        <p> Lacak progres permohonan bantuan secara real-time, mulai dari pengajuan hingga pencairan. </p>
        <button onClick={() => navigate("/Onboarding3")}>Next</button>
      </div>
      
    </div>
  );
};

export default Onboarding2;
