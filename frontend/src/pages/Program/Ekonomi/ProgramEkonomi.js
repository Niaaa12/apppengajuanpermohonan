import React from "react";
import {  useNavigate } from "react-router-dom";
import "../../../styles.css";

const ProgramEkonomi = () => {
  const Navigate = useNavigate();
  // const [openDropdown, setOpenDropdown] = useState(null);

  // const toggleDropdown = (category) => {
  //   setOpenDropdown(openDropdown === category ? null : category);
  // };

  return (
    <div className="program-page">
      {/* Tombol Back */}
      <button className="back-button" onClick={() => Navigate("/Home")}>
        &#8592; 
      </button>

      {/* Judul */}
      <h2 className="program-title">Program Ekonomi</h2>

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
        <button className="activity-button" onClick={() => toggleDropdown("ekonomi")}>
          Persyaratan Permohonan Bantuan
        </button>
        {openDropdown === "ekonomi" && (
          <div className="dropdown-content">
          <ul>
            <li>1. Surat Permohonan</li>
            <li>2. Fotocopi Kartu Tanda Penduduk (KTP)</li>
            <li>3. Fotokopi Kartu Keluarga (KK)</li>
            <li>4. Surat Keterangan Kurang Mampu (Asli)</li>
            <li>5. Surat Keterangan Jama’ah Masjid (Asli)</li>
            <li>6. Rincian Anggaran Biaya Usaha</li>
            <li>7. Denah Lokasi Usaha/Rumah</li>
            <li>8. Foto Usaha dan Foto Rumah</li>
            <li>9. Fotocopi Rekening</li>
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

export default ProgramEkonomi;
