import React from "react";
import {  useNavigate } from "react-router-dom";
import "../../../styles.css";

const ProgramDakwah = () => {
  const Navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(null);

  // const toggleDropdown = (category) => {
  //   setOpenDropdown(openDropdown === category ? null : category);
  // };

  return (
    <div className="program-page">
      {/* Tombol Back */}
      <div className="program-bg">
        <img src="/assets/bg.png" alt="bg" className="bg-img" />
        <button className="back-button" onClick={() => Navigate("/Home")}>
          &#8592; 
        </button>
        <h2 className="program-title">Program Dakwah & Advokasi</h2>
      </div>

      {/* Deskripsi Program */}
      <h3 className="section-title">PROGRAM</h3>
      <h4 className="section-subtitle">Bantuan Rumah Layak Huni</h4>
      <p className="program-description">
        Program renovasi rumah yang bekerja sama dengan Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR) untuk memenuhi kebutuhan dasar mustahik berupa tempat tinggal yang layak, memenuhi persyaratan keselamatan bangunan dan kesehatan.
      </p>

      <h4 className="section-subtitle">Bantuan Penyandang Disabilitas</h4>
      <p className="program-description">
        Bantuan bagi lembaga sosial Islam yang membantu penyandang disabilitas atau bagi individu penyandang disabilitas berupa kaki palsu, kursi roda atau alat pendukung aktivitas lainnya.
      </p>

      {/* Kegiatan */}
      <h3 className="section-title">Kegiatan</h3>
      <p className="program-description">
        Injdbjdfbd... (your detailed description)
      </p>

      {/* List Kegiatan dengan tombol dropdown */}
      {/* <div className="activity-list">
        <button className="activity-button" onClick={() => toggleDropdown("dakwah")}>
          Persyaratan Permohonan Bantuan
        </button>
        {openDropdown === "dakwah" && (
          <div className="dropdown-content">
          <ul>
            <li>1. Surat Permohonan dari Lembaga / Perorangan</li>
            <li>2. Fotocopy KTP Ketua Pelaksana / Pengurus lainnya</li>
            <li>3. Proposal Kegiatan/Pelaksanaan</li>
            <li>4. Rencana Anggaran Biaya (RAB) Kegiatan</li>
            <li>5. Dokumentasi</li>
            <li>6. Mengisi Naskah Perjanjian Bantuan</li>
            <li>7. Bersedia Memberikan Laporan Kegiatan (Dinyatakan Dalam Surat Pernyataan)</li>
          </ul>
          <button className="pengajuan-button" onClick={() => Navigate("/FormPengajuan")}>
            Ajukan Permohonan
          </button>
        </div>
        )}
      </div> */}
    </div>
  );
};

export default ProgramDakwah;
