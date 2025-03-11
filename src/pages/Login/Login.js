import { Link } from "react-router-dom";
import logobaznas from '../../assets/LOGO_BAZNAS_PADANG.png'
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const Login = () => {
  const Navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logobaznas} alt="Logo Baznas"/>
        <h2>Welcome Back</h2>
        <p>Nikmati kemudahan sistem autentikasi tunggal untuk mengakses semua layanan dengan satu akun</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <div className="forgot-pass">
          <Link to="#">Forgot Password?</Link>
        </div>

        <button className="login-button" onClick={() => Navigate("/Home")}>Login</button>

        <p>
          Don’t have an account? <Link to="/Register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
