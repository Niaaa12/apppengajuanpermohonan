import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles.css";

const ProgramEkonomi = () => {
  const navigate = useNavigate();
  const [bantuanList, setBantuanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/bantuan/ekonomi")
      .then((response) => {
        setBantuanList(response.data.bantuan || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal memuat data bantuan:", error);
        setError("Terjadi kesalahan saat mengambil data.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="program-page">
      <div className="program-bg">
      <button className="back-button" onClick={() => navigate("/Home")}>
        &#8592; 
      </button>
        <h2 className="program-title">Program Ekonomi</h2>
      </div>

      <h3 className="section-title">PROGRAM</h3>

      {loading ? (
        <p className="program-description">Memuat data bantuan...</p>
      ) : error ? (
        <p className="program-description error-text">{error}</p>
      ) : bantuanList.length === 0 ? (
        <p className="program-description">Belum ada data bantuan untuk program ini.</p>
      ) : (
        bantuanList.map((item,index) => (
          <div key={item.id} className="program-item">
            <h4 className="section-subtitle">{index + 1}. {item.nama_bantuan}</h4>
            <p className="program-description">
              {item.keterangan ||
                `Informasi mengenai ${item.nama_bantuan} akan segera ditambahkan.`}
            </p>

            {/* Persyaratan Umum */}
            {item.persyaratan_umum && item.persyaratan_umum.length > 0 && (
              <>
                <h5 className="section-subtitle">Persyaratan Umum</h5>
                <ul className="program-description">
                  {item.persyaratan_umum.map((req, idx) => (
                    <li key={`umum-${idx}`}>{req}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Persyaratan Tambahan */}
            {item.persyaratan_tambahan && item.persyaratan_tambahan.length > 0 && (
              <>
                <h5 className="section-subtitle">Persyaratan Tambahan</h5>
                <ul className="program-description">
                  {item.persyaratan_tambahan.map((req, idx) => (
                    <li key={`tambahan-${idx}`}>{req}</li>
                  ))}
                </ul>
              </>
            )}

          </div>
        ))
      )}

      <h3 className="section-title">KEGIATAN</h3>
      <p className="program-description">
  Program Ekonomi ditujukan untuk meningkatkan kemandirian dan kesejahteraan mustahik melalui pelatihan kewirausahaan, pemberian modal usaha, dan pendampingan manajemen keuangan. Kegiatan meliputi workshop pembuatan rencana bisnis, akses pasar bagi produk unggulan, serta kolaborasi dengan perbankan syariah untuk pembiayaan mikro.
</p>

    </div>
  );
};

export default ProgramEkonomi;