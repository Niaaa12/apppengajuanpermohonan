import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  CAlert,
} from "@coreui/react";

const FormPengajuan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState({ program: "", bantuanId: null, jenisProgramId: null });
  const [docRequirements, setDocRequirements] = useState({ umum: [], tambahan: [] });

  const refs = {
    fullName: useRef(null),
    nik: useRef(null),
    kkNumber: useRef(null),
    placeOfBirth: useRef(null),
    birthDate: useRef(null),
    occupation: useRef(null),
    address: useRef(null),
    phoneNumber: useRef(null),
    bankName: useRef(null),
    accountNumber: useRef(null),
    document: useRef(null),
  };

  const [formData, setFormData] = useState({
    fullName: "",
    nik: "",
    kkNumber: "",
    placeOfBirth: "",
    birthDate: "",
    occupation: "",
    address: "",
    phoneNumber: "",
    bankName: "",
    accountNumber: "",
    document: null,
    hasReceivedAssistance: false,
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/pengajuan");
      return;
    }
    const { program, bantuanId, jenisProgramId } = location.state;
    setSelectedProgram({ program, bantuanId, jenisProgramId });

    axios
      .get(`/api/program/${bantuanId}/requirements`)
      .then((res) => {
        if (res.data.success) {
          setDocRequirements(res.data.requirements);
        } else {
          setError(res.data.message || "Gagal memuat persyaratan dokumen");
        }
      })
      .catch(() => setError("Gagal memuat persyaratan dokumen"));
  }, [location, navigate]);

  const scrollAndFocus = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    ref.current?.focus();
  };

  const validateForm = () => {
    const {
      fullName,
      nik,
      kkNumber,
      placeOfBirth,
      birthDate,
      occupation,
      address,
      phoneNumber,
      bankName,
      accountNumber,
      document,
      hasReceivedAssistance,
    } = formData;
    if (!fullName) { setError("Nama lengkap wajib diisi"); scrollAndFocus(refs.fullName); return false; }
    if (!/^\d{16}$/.test(nik)) { setError("NIK harus 16 digit angka"); scrollAndFocus(refs.nik); return false; }
    if (!/^\d{16}$/.test(kkNumber)) { setError("Nomor KK harus 16 digit angka"); scrollAndFocus(refs.kkNumber); return false; }
    if (!placeOfBirth) { setError("Tempat lahir wajib diisi"); scrollAndFocus(refs.placeOfBirth); return false; }
    if (!birthDate) { setError("Tanggal lahir wajib diisi"); scrollAndFocus(refs.birthDate); return false; }
    if (!occupation) { setError("Pekerjaan wajib diisi"); scrollAndFocus(refs.occupation); return false; }
    if (!address) { setError("Alamat wajib diisi"); scrollAndFocus(refs.address); return false; }
    if (!phoneNumber) { setError("Nomor HP wajib diisi"); scrollAndFocus(refs.phoneNumber); return false; }
    if (!bankName) { setError("Nama bank wajib diisi"); scrollAndFocus(refs.bankName); return false; }
    if (!accountNumber) { setError("Nomor rekening wajib diisi"); scrollAndFocus(refs.accountNumber); return false; }
    if (!document) { setError("Harap unggah file PDF berisi semua dokumen"); scrollAndFocus(refs.document); return false; }
    if (!document.type.includes("pdf")) { setError("Hanya menerima file PDF (maks. 10MB)"); scrollAndFocus(refs.document); return false; }
    if (document.size > 10 * 1024 * 1024) { setError("Ukuran file maksimal 10MB"); scrollAndFocus(refs.document); return false; }
    if (!hasReceivedAssistance) { setError("Anda harus menyatakan belum pernah menerima bantuan"); return false; }
    return true;
  };

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        setError("User belum login");
        setIsSubmitting(false);
        return;
      }
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("nik", formData.nik);
      payload.append("kkNumber", formData.kkNumber);
      payload.append("placeOfBirth", formData.placeOfBirth);
      payload.append("birthDate", formData.birthDate);
      payload.append("occupation", formData.occupation);
      payload.append("address", formData.address);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("bankName", formData.bankName);
      payload.append("accountNumber", formData.accountNumber);
      payload.append("hasReceivedAssistance", formData.hasReceivedAssistance);
      payload.append("document", formData.document);
      payload.append("jenisProgramId", selectedProgram.jenisProgramId);
      payload.append("bantuanId", selectedProgram.bantuanId);
      payload.append("userId", user.id);
  
      const res = await axios.post(
        "/api/pengajuan",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (res.status === 201 && res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Pengajuan Berhasil!",
          html: `
            <p>ID Pengajuan: <strong>${res.data.data.pengajuanId}</strong></p>
            <p>Program: <strong>${selectedProgram.program}</strong></p>
          `,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => Swal.showLoading(),
        });
        // redirect setelah 3 detik
        setTimeout(() => {
          navigate("/Pengajuan");
        }, 3000);
      } else {
        setError(res.data.message || "Pengajuan gagal");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Pengajuan Gagal",
        text: err.response?.data?.message || err.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="application-form container py-4">
      <div className="d-flex justify-content-center mb-4">
        <img
          src={logobaznas}
          alt="Logo Baznas"
          className="img-fluid"
          style={{ maxWidth: "200px" }}
        />
      </div>
      <h2 className="text-center mb-4">
        Form Pengajuan Bantuan {selectedProgram.program}
      </h2>
      {error && (
        <CAlert color="danger" className="mb-4">
          {error}
        </CAlert>
      )}
      <CCard>
        <CCardBody>
          <CForm noValidate onSubmit={handleSubmit}>
            {/* Data Pribadi */}
            <fieldset className="mb-4">
              <legend className="fw-bold h5">Data Pribadi</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <CFormLabel>
                    Nama Lengkap <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="fullName"
                    ref={refs.fullName}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    NIK <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="nik"
                    ref={refs.nik}
                    value={formData.nik}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    No. KK <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="kkNumber"
                    ref={refs.kkNumber}
                    value={formData.kkNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    Tempat Lahir <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="placeOfBirth"
                    ref={refs.placeOfBirth}
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    Tanggal Lahir <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="date"
                    name="birthDate"
                    ref={refs.birthDate}
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    Pekerjaan <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="occupation"
                    ref={refs.occupation}
                    value={formData.occupation}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <CFormLabel>
                    Alamat <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="address"
                    ref={refs.address}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>
                    No. HP <span className="text-danger">*</span>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    name="phoneNumber"
                    ref={refs.phoneNumber}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Informasi Rekening */}
            <fieldset className="mb-4">
              <legend className="fw-bold h5">Informasi Rekening</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <CFormLabel>Nama Bank <span className="text-danger">*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    name="bankName"
                    ref={refs.bankName}
                    value={formData.bankName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <CFormLabel>No. Rekening <span className="text-danger">*</span></CFormLabel>
                  <CFormInput
                    type="text"
                    name="accountNumber"
                    ref={refs.accountNumber}
                    value={formData.accountNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </fieldset>

            {/* Dokumen Persyaratan */}
            <fieldset className="mb-4">
              <legend className="fw-bold h5">Dokumen Persyaratan</legend>
              <div className="mb-3">
                <CFormLabel>Unggah Semua Dokumen dalam 1 File PDF <span className="text-danger">*</span></CFormLabel>
                <CFormInput
                  type="file"
                  accept="application/pdf"
                  name="document"
                  ref={refs.document}
                  onChange={handleChange}
                />
                <div className="form-text mt-2">
                  <strong>Petunjuk Pengunggahan:</strong>
                  <ol className="mt-2">
                    <li>Gabungkan dokumen berikut menjadi 1 file PDF berurutan:</li>
                    <ul className="mt-2">
                      <li className="font-semibold">Persyaratan Umum:</li>
                      {docRequirements.umum.map((req, idx) => (
                        <li key={idx}>Halaman {idx + 1}: {req}</li>
                      ))}
                      <li className="font-semibold mt-2">Persyaratan Tambahan:</li>
                      {docRequirements.tambahan.map((req, idx) => (
                        <li key={idx}>Halaman {idx + 1}: {req}</li>
                      ))}
                    </ul>
                    <li className="mt-2">Maksimal ukuran file: 10MB</li>
                    <li>Pastikan semua halaman terbaca jelas</li>
                    <li>File harus dalam format PDF</li>
                  </ol>
                </div>
              </div>
            </fieldset>

            {/* Pernyataan */}
            <div className="mb-3 d-flex align-items-center custom-checkbox-size">
              <CFormCheck
                type='checkbox'
                id="hasReceivedAssistance"
                name="hasReceivedAssistance"
                checked={formData.hasReceivedAssistance}
                onChange={handleChange}
                label="Saya menyatakan belum pernah menerima bantuan serupa dari BAZNAS"
              />
            </div>

            {/* Tombol Submit */}
            <div className="d-grid gap-2 mt-4">
              <CButton
                type="submit"
                color="success"
                disabled={isSubmitting}
                className="py-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Mengirim Pengajuan...
                  </>
                ) : (
                  "Kirim Permohonan"
                )}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default FormPengajuan;
