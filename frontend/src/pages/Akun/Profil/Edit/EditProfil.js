import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../../../styles.css';
import { toast } from 'react-toastify'
const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch current profile data
    axios
      .get("http://localhost:5000/api/pemohon/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const u = res.data.user;
        setName(u.name || "");
        setPhone(u.phoneNumber || "");
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal memuat data profil.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSave = () => {
    const token = localStorage.getItem("token");
    const payload = { name, phoneNumber: phone };
  
    axios
      .put(
        "/api/pemohon/profile",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((res) => {
        const updatedUser = res.data.user;
        toast.success("Profil berhasil diubah.", {
                autoClose: 2000,      // tutup otomatis 2 detik
                pauseOnHover: false,  // jangan pause saat hover
              })
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/Akun/Profil");
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal menyimpan perubahan.");
      });
  };

  if (loading) return <div className="edit-profile-container">Loading...</div>;
  if (error) return <div className="edit-profile-container">{error}</div>;

  return (
    <div className="edit-profile-container">
      {/* Header */}
      <div className="edit-profile-header">
        <button
          className="back-button"
          onClick={() => navigate("/Akun/Profil")}
        >
          &#8592;
        </button>
        <h2 className="edit-profile-title">Edit Profil</h2>
      </div>

      {/* Foto Profil (Default) */}
      <div className="profile-image-section">
        <img
          src="/assets/LOGO_BAZNAS_PADANG.png"
          alt="Profile"
          className="profile-image"
        />
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
          <input type="text" value={localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''} disabled />
        </div>

        <label>Nomor Handphone</label>
        <div className="phone-input">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button className="save-button" onClick={handleSave}>
          Simpan
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
