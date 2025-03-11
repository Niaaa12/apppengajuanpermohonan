import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { title: "Program Kemanusiaan", icon: "/assets/kemanusiaan.png", path: "/Program/Kemanusiaan" },
    { title: "Program Kesehatan", icon: "/assets/kesehatan.png", path: "/Program/Kesehatan" },
    { title: "Program Ekonomi", icon: "/assets/ekonomi.png", path: "/Program/Ekonomi" },
    { title: "Program Pendidikan", icon: "/assets/pendidikan.png", path: "/Program/Pendidikan" },
    { title: "Program Dakwah & Advokasi", icon: "/assets/dakwah.png", path: "/Program/Dakwah" },
  ];

  return (
    <div className="home-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/assets/LOGO_BAZNAS_PADANG.png" alt="Logo Baznas" className="logo" />
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="title">CAHAYA ZAKAT</h1>
        <p className="subtitle">Cahaya Bagi Muzaki dan Mustahik</p>
      </div>

      {/* Layanan */}
      <section className="services-section">
        <h2>Sistem Informasi Pelayanan Permohonan Bantuan Program</h2>
        <h3>Layanan</h3>
        <div className="services-grid">
          {services.map((service, index) => (
            <button key={index} className="service-card" onClick={() => navigate(service.path)}>
              <img src={service.icon} alt={service.title} className="service-icon" />
              <p>{service.title}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;