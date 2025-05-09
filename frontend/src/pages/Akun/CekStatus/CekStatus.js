import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';

const CekStatus = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/api/cekstatus", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setPengajuan(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data status permohonan.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div className="cek-status-container">Loading…</div>;
  }

  if (error) {
    return <div className="cek-status-container text-danger">{error}</div>;
  }

  return (
    <div className="cek-status-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/Akun")}>
          &#8592;
        </button>
        <h2>Cek Status Permohonan</h2>
      </div>

      <CCard>
        <CCardHeader>
          <h4 className="mb-0">Daftar Status Permohonan</h4>
        </CCardHeader>
        <CCardBody>
          <div className='table-responsive-mobile'>
          <CTable align="middle" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Nama</CTableHeaderCell>
                <CTableHeaderCell>NIK</CTableHeaderCell>
                <CTableHeaderCell>Jenis Bantuan</CTableHeaderCell>
                <CTableHeaderCell>Tanggal Pengajuan</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pengajuan.map((item) => {
                const displayStatus =
                  item.status === 'Disetujui'
                    ? 'Disetujui'
                    : item.status === 'Ditolak'
                    ? 'Ditolak'
                    : 'Diproses';
                const badgeClass =
                  displayStatus === 'Disetujui'
                    ? 'badge bg-success'
                    : displayStatus === 'Ditolak'
                    ? 'badge bg-danger'
                    : 'badge bg-warning text-dark';

                return (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.nama}</CTableDataCell>
                    <CTableDataCell>{item.nik}</CTableDataCell>
                    <CTableDataCell>{item.nama_bantuan}</CTableDataCell>
                    <CTableDataCell>
                      {new Date(item.tanggal_pengajuan).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className={badgeClass}>{displayStatus}</span>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default CekStatus;
