import React, { useState } from "react";
import logobaznas from "../../assets/LOGO_BAZNAS_PADANG.png";
import "../../styles.css";
import {
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
  CButton,
  CCard,
  CCardBody,
} from "@coreui/react";
const FormPengajuan = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    kkNumber: "",
    placeOfBirth: "",
    birthDate: "",
    occupation: "",
    address: "",
    phoneNumber: "",
    accountNumber: "",
    bankName: "",
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
      [name]: type === "checkbox" ? checked : value,
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
      <div className="d-flex justify-content-center">
        <img src={logobaznas} alt="Logo Baznas" className="img-fluid" />
      </div>

      <h2>Form Pengajuan Permohonan Bantuan Program</h2>
      <CCard>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="fullName">Nama Lengkap:</CFormLabel>
              <CFormInput
                type="text"
                id="fullName"
                name="fullName"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="nik">NIK:</CFormLabel>
              <CFormInput
                type="text"
                id="nik"
                name="nik"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="kkNumber">No. KK:</CFormLabel>
              <CFormInput
                type="text"
                id="kkNumber"
                name="kkNumber"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="placeOfBirth">Tempat Lahir:</CFormLabel>
              <CFormInput
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="birthDate">Tanggal Lahir:</CFormLabel>
              <CFormInput
                type="date"
                id="birthDate"
                name="birthDate"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="occupation">Pekerjaan:</CFormLabel>
              <CFormInput
                type="text"
                id="occupation"
                name="occupation"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="address">Alamat:</CFormLabel>
              <CFormInput
                type="text"
                id="address"
                name="address"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="phoneNumber">No. HP:</CFormLabel>
              <CFormInput
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            {/* Rekening Info */}
            <div className="mb-3">
              <CFormLabel htmlFor="accountName">Rekening A/N:</CFormLabel>
              <CFormInput
                type="text"
                id="accountName"
                name="accountName"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="bankName">Nama Bank:</CFormLabel>
              <CFormInput
                type="text"
                id="bankName"
                name="bankName"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="accountNumber">No. Rekening:</CFormLabel>
              <CFormInput
                type="text"
                id="accountNumber"
                name="accountNumber"
                className="w-100"
                onChange={handleChange}
                required
              />
            </div>

            {/* File Uploads */}
            <div className="mb-3">
              <CFormLabel htmlFor="applicationLetter">
                Surat Permohonan:
              </CFormLabel>
              <CFormInput
                type="file"
                id="applicationLetter"
                name="applicationLetter"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="ktpPhoto">Foto KTP:</CFormLabel>
              <CFormInput
                type="file"
                id="ktpPhoto"
                name="ktpPhoto"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="familyCard">Kartu Keluarga:</CFormLabel>
              <CFormInput
                type="file"
                id="familyCard"
                name="familyCard"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="sktm">
                Surat Keterangan Tidak Mampu (SKTM):
              </CFormLabel>
              <CFormInput
                type="file"
                id="sktm"
                name="sktm"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="mosqueLetter">
                Surat Keterangan Jama'ah Masjid:
              </CFormLabel>
              <CFormInput
                type="file"
                id="mosqueLetter"
                name="mosqueLetter"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="kepemilikantanah">
                Foto Kepemilikan Tanah:
              </CFormLabel>
              <CFormInput
                type="file"
                id="kepemilikantanah"
                name="kepemilikantanah"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="housePhoto">Foto Rumah:</CFormLabel>
              <CFormInput
                type="file"
                id="housePhoto"
                name="housePhoto"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="housePlan">Denah Lokasi Rumah:</CFormLabel>
              <CFormInput
                type="file"
                id="housePlan"
                name="housePlan"
                className="w-100"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Checkbox */}
            <div className="mb-3 d-flex align-items-center custom-checkbox-size">
              <CFormCheck
                type="checkbox"
                id="hasReceivedAssistance"
                name="hasReceivedAssistance"
                label="&nbsp;&nbsp;Belum Pernah Menerima Bantuan dari BAZNAS"
                onChange={handleChange}
              />
            </div>

            {/* Tombol Submit */}
            <div className="d-flex justify-content-center">
              <CButton type="submit" color="success" className="w-100 py-1">
                Kirim
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default FormPengajuan;
