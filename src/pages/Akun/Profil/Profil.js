import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../styles.css';

const Profile = () => {
    const Navigate = useNavigate();
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
      <button className="back-button" onClick={() => Navigate("/Akun")}>&larr;</button>
        <h2 className="profile-title">Profile</h2>
      </div>

      {/* Foto Profil */}
      <div className="profile-info">
        <img
          src="/assets/iconuser.png"
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">Kurnia Ningsih</h2>
      </div>

      {/* Detail Informasi */}
      <div className="profile-details">
        <div className="profile-detail">
          <p className="label">Email</p>
          <p className="value">krnsh1203@gmail.com</p>
        </div>
        <div className="profile-detail">
          <p className="label">Jenis Kelamin</p>
          <p className="value">Perempuan</p>
        </div>
        <div className="profile-detail">
          <p className="label">Nomor Handphone</p>
          <p className="value">082174169413</p>
        </div>
      </div>

      {/* Tombol Edit */}
      <button className="edit-button" onClick={() => Navigate("/Akun/Profil/Edit")}>Edit</button>
    </div>
  );
};

export default Profile;
