import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika pengiriman email reset password di sini
    alert(`Instruksi reset password telah dikirim ke ${email}`);
    Navigate("/login"); // Redirect setelah submit
  };

  return (
    <div className="forgot-password-container">
      <div className="header">
        <button className="back-button" onClick={() => Navigate("/Login")}>
          &#8592;
        </button>
        <h2>Lupa Kata Sandi</h2>
      </div>
      <p className="instruction">
        Masukkan alamat email Anda yang terdaftar, untuk melakukan pengaturan
        ulang kata sandi.
      </p>

      <form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Masukkan email aktif Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">
          Ubah Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
