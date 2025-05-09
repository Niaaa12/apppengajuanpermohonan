import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logobaznas from "../../assets/LOGO_BAZNAS_PADANG.png";
import "../../styles.css";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/pemohon/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src={logobaznas} alt="Logo Baznas" />
        <h2>Welcome to BaznasCare</h2>

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
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      Swal.fire({
        title: 'Lupa Password?',
        html: `
          <p>Silakan hubungi admin melalui:</p>
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>WhatsApp:</strong> 0812-3456-7890</p>
        `,
        icon: 'info',
        confirmButtonText: 'Tutup'
      });
    }}
  >
    Forgot Password?
  </a>
</div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p>
          Don’t have an account? <Link to="/Register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
