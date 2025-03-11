import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import logo from "../../assets/LOGO_BAZNAS_PADANG.png";
import Pattern01 from "../../assets/Pattern01.png";
import Pattern02 from "../../assets/Pattern02.png";



const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/Onboarding1"); 
    }, 3000);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={Pattern01} alt="motif" className="splash-bg-top" />
      
      <img src={logo} alt="BAZNAS" className="splash-logo" />
      <h1 className="splash-title">SIPADU</h1>
      
      <img src={Pattern02} alt="motif" className="splash-bg-bottom" />
    </div>
  );
};

export default SplashScreen;
