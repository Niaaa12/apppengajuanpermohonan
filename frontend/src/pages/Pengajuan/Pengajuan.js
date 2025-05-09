import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pengajuan = () => {
  const [programs, setPrograms] = useState([]);
  const [openMainDropdown, setOpenMainDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ambil data dari backend
  useEffect(() => {
    axios
      .get("/api/bantuan/grouped")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleMainDropdown = (key) => {
    setOpenMainDropdown((prev) => (prev === key ? null : key));
    setOpenSubDropdown(null);
  };

  const toggleSubDropdown = (id) => {
    setOpenSubDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <div className="pengajuan-page">
      <h2 className="section-title">
        Syarat Permohonan Bantuan Program BAZNAS Kota Padang
      </h2>
      <div className="dropdown-container" ref={dropdownRef}>
        {programs.map((program) => (
          <div className="btn-group dropdown" key={program.jenis_program}>
            <button
              className="btn-program"
              onClick={() => toggleMainDropdown(program.jenis_program)}
            >
              Program {program.jenis_program}
            </button>

            {openMainDropdown === program.jenis_program && (
              <ul className="dropdown-menu show">
                {program.subItems.map((item) => (
                  <li key={item.id}>
                    <div className="activity-list">
                      <button
                        className="activity-button"
                        onClick={() => toggleSubDropdown(item.id)}
                      >
                        {item.nama_bantuan}
                      </button>

                      {openSubDropdown === item.id && (
                        <div className="dropdown-content">
                          <ul>
                            {item.requirements.map((req, i) => (
                              <li key={i}>
                                {i + 1}. {req}
                              </li>
                            ))}
                          </ul>
                          <button
                            className="pengajuan-button"
                            onClick={() =>
                              navigate("/FormPengajuan", {
                                state: {
                                  program: program.jenis_program,
                                  bantuanId: item.id,
                                },
                              })
                            }
                          >
                            Ajukan Permohonan
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pengajuan;
