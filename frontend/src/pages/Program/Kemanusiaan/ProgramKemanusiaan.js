import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles.css";

const ProgramKemanusiaan = () => {
  const Navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(null);

  // const toggleDropdown = (category) => {
  //   setOpenDropdown(openDropdown === category ? null : category);
  // };

  return (
    <div className="program-page">
      <button className="back-button" onClick={() => Navigate("/Home")}>
        &#8592;
      </button>

      <h2 className="program-title">Program Kemanusiaan</h2>

      <h3 className="section-title">PROGRAM</h3>
      <h4 className="section-subtitle">Ramadhan Berbagi</h4>
      <h4 className="section-subtitle">1. Paket Sembako Ceria</h4>
      <p className="program-description">
        Santunan yang diberikan kepada Mustahik yang tergolong fakir/miskin
        dalam bentuk sembako untuk membantu masyarakat Kota Padang dalam
        memenuhi kebutuhannya khususnya di bulan puasa dan menjelang lebaran.
      </p>
      <h5 className="syarat">Syarat</h5>

      <h4 className="section-subtitle">2. Santunan Yatim</h4>
      <p className="program-description">
        Bantuan yang diberikan kepada anak yatim/yatim piatu. Untuk membantu
        anak yatim/yatim piatu memenuhi kebutuhan dasar.
      </p>

      <h3 className="section-title">Kebencanaan</h3>
      <p className="program-description">
        <img
          src="/assets/kebencanaan.jpeg"
          alt="Program"
          className="program-image"
        />
        Injdbjdfbd... (your detailed description)
      </p>

      {/* <h3 className="section-title">Syarat Permohonan Bantuan</h3> */}
      {/* <div className="activity-list">
        <button className="activity-button" onClick={() => toggleDropdown("lansia")}>
          Kategori Lansia
        </button>
        {openDropdown === "lansia" && (
          <div className="dropdown-content">
            <ul>
              <li>1. Surat Permohonan</li>
              <li>2. Fotocopi Kartu Tanda Penduduk (KTP)</li>
              <li>3. Fotokopi Kartu Keluarga (KK)</li>
              <li>4. Surat Keterangan Kurang Mampu (Asli)</li>
              <li>5. Surat Keterangan Jama’ah Masjid (Asli)</li>
              <li>6. Foto Pemohon Didepan Rumah</li>
              <li>7. Denah Lokasi Rumah</li>
              <li>8. Belum Pernah Menerima Bantuan Dari BAZNAS</li>
            </ul>
            <button className="pengajuan-button" onClick={() => Navigate("/FormPengajuan")}>
              Ajukan Permohonan
            </button>
          </div>
        )}

        <button className="activity-button" onClick={() => toggleDropdown("rehab")}>
          Bedah/Rehab Rumah
        </button>
        {openDropdown === "rehab" && (
          <div className="dropdown-content">
            <ul>
              <li>1. Surat Permohonan</li>
              <li>2. Fotocopi Kartu Tanda Penduduk (KTP)</li>
              <li>3. Fotokopi Kartu Keluarga (KK)</li>
              <li>4. Surat Keterangan Kurang Mampu (Asli)</li>
              <li>5. Surat Keterangan Jama’ah Masjid (Asli)</li>
              <li>6. Fotocopi Kepemilikan Tanah</li>
              <li>7. Denah lokasi rumah</li>
              <li>8. Foto Rumah</li>
            </ul>
            <button className="pengajuan-button" onClick={() => Navigate("/FormPengajuan")}>
              Ajukan Permohonan
            </button>
          </div>
        )}

        <button className="activity-button" onClick={() => toggleDropdown("kebencanaan")}>
          Kebencanaan
        </button>
        {openDropdown === "kebencanaan" && (
          <div className="dropdown-content">
            <ul>
              <li>1. Surat Permohonan</li>
              <li>2. Surat Pengantar Dari Lurah</li>
              <li>3. Fotocopi KTP Suami dan Istri</li>
              <li>4. Fotokopi Kartu Keluarga (KK)</li>
              <li>5. Surat Keterangan Kurang Mampu (Asli)</li>
              <li>6. Surat Keterangan Jama’ah Masjid (Asli)</li>
              <li>7. Foto / Dokumentasi</li>
              <li>8. Denah Rumah</li>
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

export default ProgramKemanusiaan;
