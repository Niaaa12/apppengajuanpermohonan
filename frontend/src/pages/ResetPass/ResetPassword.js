import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password harus memiliki minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    alert("Password berhasil direset!");
    navigate("/login");
  };

  return (
    <div className="reset-password-page">
      <button className="back-button" onClick={() => navigate("/Akun")}>
        &larr;
      </button>
      <div className="reset-password-container">
        <div className="header">
          <h2>Reset Password</h2>
        </div>

        <p className="instruction">
          Masukkan kata sandi baru Anda dan pastikan berbeda dari kata sandi
          sebelumnya.
        </p>

        <form className="form-container" onSubmit={handleSubmit}>
          <label>Password Saat Ini</label>
          <input
            type="password"
            placeholder="Masukkan password saat ini"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <label>Password Baru</label>
          <input
            type="password"
            placeholder="Masukkan password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Konfirmasi Password</label>
          <input
            type="password"
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="button-reset">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
