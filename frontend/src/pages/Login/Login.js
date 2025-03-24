import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logobaznas from '../../assets/LOGO_BAZNAS_PADANG.png';
import "../../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk pesan error
  const Navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Hindari reload halaman

    if (!email || !password) {
      setError("Email dan Password harus diisi!");
      return;
    } else {
      setError(""); // Reset error jika sudah diisi
    }

    // Redirect ke halaman Home jika valid
    Navigate("/Home");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logobaznas} alt="Logo Baznas"/>
        <h2>Welcome Back to BaznasCare</h2>
        <p>Nikmati kemudahan sistem autentikasi tunggal untuk mengakses semua layanan dengan satu akun</p>

        <form onSubmit={handleLogin}>
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

          {/* Tampilkan pesan error jika ada */}
          {error && <p className="error-message">{error}</p>}

          <div className="forgot-pass">
            <Link to="/ForgotPass">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <p>
          Don’t have an account? <Link to="/Register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
