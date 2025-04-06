import React, { useState, useEffect, useRef } from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";

const Pengajuan = () => {
  const [openMainDropdown, setOpenMainDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const Navigate = useNavigate();

  // Handle click di luar dropdown untuk menutupnya
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMainDropdown(null);
        setOpenSubDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMainDropdown = (program) => {
    setOpenMainDropdown(openMainDropdown === program ? null : program);
    setOpenSubDropdown(null);
  };

  const toggleSubDropdown = (category) => {
    setOpenSubDropdown(openSubDropdown === category ? null : category);
  };

  return (
    <div className="pengajuan-page">
      <div className="dropdown-container" ref={dropdownRef}>
        <h2 className="section-title">
          Syarat Permohonan Bantuan Program BAZNAS Kota Padang{" "}
        </h2>
        <div className="btn-group dropdown">
          <button
            type="button"
            className="btn-program"
            onClick={() => toggleMainDropdown("kemanusiaan")}
          >
            Program Kemanusiaan
          </button>
          <ul
            className={`dropdown-menu ${
              openMainDropdown === "kemanusiaan" ? "show" : ""
            }`}
          >
            <li>
              <div className="activity-list">
                <button
                  className="activity-button"
                  onClick={() => toggleSubDropdown("lansia")}
                >
                  Kategori Lansia
                </button>
                {openSubDropdown === "lansia" && (
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
                    <button
                      className="pengajuan-button"
                      onClick={() => Navigate("/FormPengajuan")}
                    >
                      Ajukan Permohonan
                    </button>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="activity-list">
                <button
                  className="activity-button"
                  onClick={() => toggleSubDropdown("rehab")}
                >
                  Bedah/Rehab Rumah
                </button>
                {openSubDropdown === "rehab" && (
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
                    <button
                      className="pengajuan-button"
                      onClick={() => Navigate("/FormPengajuan")}
                    >
                      Ajukan Permohonan
                    </button>
                  </div>
                )}
              </div>
            </li>
            <li>
              <div className="activity-list">
                <button
                  className="activity-button"
                  onClick={() => toggleSubDropdown("kebencanaan")}
                >
                  Kebencanaan
                </button>
                {openSubDropdown === "kebencanaan" && (
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
                    <button
                      className="pengajuan-button"
                      onClick={() => Navigate("/FormPengajuan")}
                    >
                      Ajukan Permohonan
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="btn-group dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="btn-program"
            onClick={() => toggleMainDropdown("kesehatan")}
          >
            Program Kesehatan
          </button>
          <ul
            className={`dropdown-menu ${
              openMainDropdown === "kesehatan" ? "show" : ""
            }`}
          >
            <li>
              {openMainDropdown === "kesehatan" && (
                <div className="dropdown-content">
                  <ul>
                    <li>1. Surat Permohonan</li>
                    <li>2. Fotocopi Kartu Tanda Penduduk (KTP)</li>
                    <li>3. Fotokopi Kartu Keluarga (KK)</li>
                    <li>4. Surat Keterangan Kurang Mampu (Asli)</li>
                    <li>5. Surat Keterangan Jama’ah Masjid (Asli)</li>
                    <li>6. Surat Keterangan Sakit</li>
                    <li>7. Foto / Dokumentasi</li>
                    <li>8. Kwitansi Berobat</li>
                    <li>9. Foto Rumah dan Denah Rumah</li>
                    <li>10.Fotocopi Rekening</li>
                  </ul>
                  <button
                    className="pengajuan-button"
                    onClick={() => Navigate("/FormPengajuan")}
                  >
                    Ajukan Permohonan
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="btn-group dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="btn-program"
            onClick={() => toggleMainDropdown("ekonomi")}
          >
            Program Ekonomi
          </button>
          <ul
            className={`dropdown-menu ${
              openMainDropdown === "ekonomi" ? "show" : ""
            }`}
          >
            <li>
              {openMainDropdown === "ekonomi" && (
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
                  <button
                    className="pengajuan-button"
                    onClick={() => Navigate("/FormPengajuan")}
                  >
                    Ajukan Permohonan
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="btn-group dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="btn-program"
            onClick={() => toggleMainDropdown("pendidikan")}
          >
            Program Pendidikan
          </button>
          <ul
            className={`dropdown-menu ${
              openMainDropdown === "pendidikan" ? "show" : ""
            }`}
          >
            <li>
              {openMainDropdown === "pendidikan" && (
                <div className="dropdown-content">
                  <ul>
                    <li>1. Surat Permohonan</li>
                    <li>2. Fotocopi KTP Suami – Istri</li>
                    <li>3. Fotocopi Kartu Keluarga (KK)</li>
                    <li>4. Surat Keterangan Kurang Mampu (Asli)</li>
                    <li>5. Surat Keterangan Jama’ah Masjid (Asli)</li>
                    <li>6. Foto Rumah dan Denah Rumah</li>
                    <li>7. Surat Keterangan Hutang Dari Sekolah</li>
                    <li>8. Nomor Rekening Bank</li>
                    <li>
                      9. Belum Pernah Menerima Bantuan Dari BAZNAS Kota Padang
                    </li>
                  </ul>
                  <button
                    className="pengajuan-button"
                    onClick={() => Navigate("/FormPengajuan")}
                  >
                    Ajukan Permohonan
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className="btn-group dropdown" ref={dropdownRef}>
          <button
            type="button"
            className="btn-program"
            onClick={() => toggleMainDropdown("dakwah")}
          >
            Program Dakwah & Advokasi
          </button>
          <ul
            className={`dropdown-menu ${
              openMainDropdown === "dakwah" ? "show" : ""
            }`}
          >
            <li>
              {openMainDropdown === "dakwah" && (
                <div className="dropdown-content">
                  <ul>
                    <li>1. Surat Permohonan dari Lembaga / Perorangan</li>
                    <li>2. Fotocopy KTP Ketua Pelaksana / Pengurus lainnya</li>
                    <li>3. Proposal Kegiatan/Pelaksanaan</li>
                    <li>4. Rencana Anggaran Biaya (RAB) Kegiatan</li>
                    <li>5. Dokumentasi</li>
                    <li>6. Mengisi Naskah Perjanjian Bantuan</li>
                    <li>
                      7. Bersedia Memberikan Laporan Kegiatan (Dinyatakan Dalam
                      Surat Pernyataan)
                    </li>
                  </ul>
                  <button
                    className="pengajuan-button"
                    onClick={() => Navigate("/FormPengajuan")}
                  >
                    Ajukan Permohonan
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pengajuan;
