import React from "react";
import "../../styles.css";
import { useNavigate } from "react-router-dom";

const Akun = () => {
  const navigate = useNavigate();

  return (
    <div className="akun-container">
      <header className="header">
        <h2 className="header-title">Akun</h2>
      </header>

      <ul className="akun-list">
        <li onClick={() => navigate("/Akun/Profil")}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="8"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <path
                d="M4 20c0-4 4-7 8-7s8 3 8 7"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></path>
            </g>
          </svg>
          Kelola Profil
        </li>

        {/* Tambahkan opsi Cek Status */}
        <li onClick={() => navigate("/Akun/CekStatus")}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-10h2v8h-2z"></path>
            </g>
          </svg>
          Cek Status
        </li>

        {/* Tambahkan opsi Ubah Password */}
        <li onClick={() => navigate("/ResetPass")}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm2.93-4H9.07c-.59 0-1.07-.48-1.07-1.07v-1.93c0-.59.48-1.07 1.07-1.07h5.86c.59 0 1.07.48 1.07 1.07v1.93c0 .59-.48 1.07-1.07 1.07z"></path>
            </g>
          </svg>
          Ubah Password
        </li>

        <li className="logout" onClick={() => navigate("/Login")}>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <path
                d="M10 15L15 12L10 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></path>
              <rect
                x="3"
                y="4"
                width="14"
                height="16"
                rx="2"
                ry="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              ></rect>
            </g>
          </svg>
          Keluar
        </li>
      </ul>
    </div>
  );
};

export default Akun;
