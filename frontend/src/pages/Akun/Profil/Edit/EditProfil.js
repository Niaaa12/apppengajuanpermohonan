import React, { useState } from "react";
import '../../../../styles.css';
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const Navigate = useNavigate();
  const [name, setName] = useState("Kurnia Ningsih");
  const [email] = useState("krnsh1203@gmail.com"); // Email tidak bisa diubah
  const [gender, setGender] = useState("Perempuan");
  const [phone, setPhone] = useState("82174169413");

  return (
    <div className="edit-profile-container">
      {/* Header */}
      <div className="edit-profile-header">
        <button
          className="back-button"
          onClick={() => Navigate("/Akun/Profil")}
        >
          &#8592;
        </button>
        <h2 className="edit-profile-title">Edit Profil</h2>
      </div>

      {/* Foto Profil */}
      <div className="profile-image-section">
        <img
          src="/assets/LOGO_BAZNAS_PADANG.png"
          alt="Profile"
          className="profile-image"
        />
        <button className="camera-button">
          <span role="img" aria-label="camera">
            📷
          </span>
        </button>
      </div>

      {/* Form Input */}
      <div className="edit-form">
        <label>Nama Lengkap</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <div className="input-disabled">
          <span className="email-icon">📧</span>
          <input type="text" value={email} disabled />
        </div>

        <label>Jenis Kelamin</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label>Nomor Handphone</label>
        <div className="phone-input">
          <span className="phone-prefix">+62</span>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="save-button">Simpan</button>
      </div>
    </div>
  );
};

export default EditProfile;
