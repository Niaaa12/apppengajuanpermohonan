import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBaznas from "../../assets/LOGO_BAZNAS_PADANG.png";
import "../../styles.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State untuk pesan error
  const Navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Hindari reload halaman

    if (!fullName || !email || !password) {
      setError("Semua kolom harus diisi!");
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
        <img src={logoBaznas} alt="Logo Baznas" />
        <h2>Welcome to BaznasCare</h2>
        <p>Create your new account</p>

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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <div className="terms">
            Dengan melanjutkan, Anda menyetujui persyaratan{" "}
            <a href="#Login">Ketentuan Layanan</a> dan mengakui bahwa Anda telah
            membaca <a href="#Login">Kebijakan Privasi</a>.
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
