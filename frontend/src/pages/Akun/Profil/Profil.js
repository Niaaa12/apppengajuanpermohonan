import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../styles.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/api/pemohon/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data profil.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">{error}</div>;
  }

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate("/Akun")}>
          &#8592;
        </button>
      </div>

      {/* Foto Profil */}
      <div className="profile-info">
        <img
          src={"/assets/logo_baznas.png"}
          alt="Profile"
          className="profile-image"
        />
        <h2 className="profile-name">{user.name || user.email}</h2>
      </div>

      {/* Detail Informasi */}
      <div className="profile-details">
        <div className="profile-detail">
          <p className="label">Email</p>
          <p className="value">{user.email}</p>
        </div>
        <div className="profile-detail">
          <p className="label">Nomor Handphone</p>
          <p className="value">{user.phoneNumber || '-'}</p>
        </div>
      </div>

      {/* Tombol Edit */}
      <button
        className="edit-button"
        onClick={() => navigate("/Akun/Profil/Edit")}
      >
        Edit
      </button>
    </div>
  );
};

export default Profile;
