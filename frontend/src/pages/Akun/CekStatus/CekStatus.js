import React, { useEffect, useState} from 'react'
import { getPengajuan } from '../../../services/api';
import { useNavigate } from 'react-router-dom'

const CekStatus = () => {
  const [pengajuan, setPengajuan] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getPengajuan();
      setPengajuan(data);
    }
    fetchData();
  }, []);

  return (
    <div className="cek-status-container">
      <div className="header">
        <button className="back-button" onClick={() => Navigate("/Akun")}>
            &#8592; 
        </button>
        <h2>Cek Status Permohonan</h2>
      </div>
      <table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIK</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuan.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nama}</td>
                            <td>{item.nik}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default CekStatus