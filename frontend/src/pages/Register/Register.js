import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBaznas from "../../assets/LOGO_BAZNAS_PADANG.png";
import "../../styles.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Tambahan
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !phoneNumber) {
      setError("Semua kolom harus diisi!");
      return;
    }

    try {
      const response = await fetch("/api/pemohon/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        navigate("/Login");
      } else {
        setError(data.message || "Registrasi gagal.");
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className="auth-container-register">
      <div className="auth-box-register">
        <img src={logoBaznas} alt="Logo Baznas" />
        <h2>Welcome to SIPADU</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <div className="terms">
            Dengan melanjutkan, Anda menyetujui persyaratan Ketentuan Layanan
            dan mengakui bahwa Anda telah membaca Kebijakan Privasi.
          </div>

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/Login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
