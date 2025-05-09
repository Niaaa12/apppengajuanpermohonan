import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'
import "../../styles.css";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password harus memiliki minimal 8 karakter.", {
        autoClose: 2000,
        pauseOnHover: false,
      });      
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok.", {
        autoClose: 2000,
        pauseOnHover: false,
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/api/pemohon/change-password",
        {
          oldPassword: currentPassword,
          newPassword: password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success("Password berhasil diubah.", {
        autoClose: 2000,      // tutup otomatis 2 detik
        pauseOnHover: false,  // jangan pause saat hover
      })
      
      setTimeout(() => {
        navigate("/Akun")
      }, 2000)
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Gagal mengganti password. Coba lagi.",
        { autoClose: 2000, pauseOnHover: false }
      );
    }
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
          Masukkan kata sandi baru Anda dan pastikan berbeda dari kata sandi sebelumnya.
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

          <button type="submit" className="button-reset">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
