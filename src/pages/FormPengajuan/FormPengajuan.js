import React, { useState } from 'react';
import logobaznas from '../../assets/LOGO_BAZNAS_PADANG.png'
import '../../styles.css'

const FormPengajuan = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    kkNumber: '',
    placeOfBirth: '',
    birthDate: '',
    occupation: '',
    address: '',
    phoneNumber: '',
    accountNumber: '',
    bankName: '',
    applicationLetter: null,
    ktpPhoto: null,
    familyCard: null,
    sktm: null,
    mosqueLetter: null,
    kepemilikantanah: null,
    housePhoto: null,
    housePlan: null,
    hasReceivedAssistance: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call)
    console.log(formData);
  };

  return (
    <div className="application-form">
        <img src={logobaznas} alt="Logo Baznas"/>
      <h2>Form Pengajuan Permohonan Bantuan Program</h2>
      <form onSubmit={handleSubmit}>        
        <label>
          Nama Lengkap:
          <input type="text" name="fullName" onChange={handleChange} required />
        </label>
        
        <label>
          NIK:
          <input type="text" name="nik" onChange={handleChange} required />
        </label>
        
        <label>
          No. KK:
          <input type="text" name="kkNumber" onChange={handleChange} required />
        </label>
        
        <label>
          Tempat Lahir:
          <input type="text" name="placeOfBirth" onChange={handleChange} required />
        </label>
        
        <label>
          Tanggal Lahir:
          <input type="date" name="birthDate" onChange={handleChange} required />
        </label>
        
        <label>
          Pekerjaan:
          <input type="text" name="occupation" onChange={handleChange} />
        </label>
        
        <label>
          Alamat:
          <input type="text" name="address" onChange={handleChange} required />
        </label>
        
        <label>
          No. HP:
          <input type="text" name="phoneNumber" onChange={handleChange} required />
        </label>
        
        <label>
          Rekening A/N:
          <input type="text" name="accountNumber" onChange={handleChange} required />
        </label>
        
        <label>
          Nama Bank:
          <input type="text" name="bankName" onChange={handleChange} required />
        </label>
        
        <label>
          No. Rekening:
          <input type="text" name="accountNumber" onChange={handleChange} required />
        </label>
        
        <label>
          Surat Permohonan:
          <input type="file" name="applicationLetter" onChange={handleFileChange} required />
        </label>
        
        <label>
          Foto KTP:
          <input type="file" name="ktpPhoto" onChange={handleFileChange} required />
        </label>
        
        <label>
          Kartu Keluarga:
          <input type="file" name="familyCard" onChange={handleFileChange} required />
        </label>
        
        <label>
          Surat Keterangan Tidak Mampu (SKTM):
          <input type="file" name="sktm" onChange={handleFileChange} required />
        </label>
        
        <label>
          Surat Keterangan Jama'ah Masjid:
          <input type="file" name="mosqueLetter" onChange={handleFileChange} required />
        </label>
        
        <label>
          Foto Kepemilikan Tanah:
          <input type="file" name="kepemilikantanah" onChange={handleFileChange} required />
        </label>

        <label>
          Foto Rumah:
          <input type="file" name="housePhoto" onChange={handleFileChange} required />
        </label>
        
        <label>
          Denah Lokasi Rumah:
          <input type="file" name="housePlan" onChange={handleFileChange} required />
        </label>
        
        <label>
          <input
            type="checkbox"
            name="hasReceivedAssistance"
            onChange={handleChange}
          />
          Belum Pernah Menerima Bantuan dari BAZNAS
        </label>
        
        <button type="submit" style={{backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px'}}>
          Kirim
        </button>
      </form>
    </div>
  );
};

export default FormPengajuan;