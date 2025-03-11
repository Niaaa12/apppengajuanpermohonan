import React from "react";
import '../../styles.css';
import { useNavigate } from "react-router-dom";

const Akun = () => {
    const Navigate = useNavigate();
    return (
    <div className="akun-container">
      <header className="header">
      <h2 className="header-title">Akun</h2>
      <button onClick={() => Navigate("/Akun/FAQ")} className="faq-button">
        <svg
          className="faq-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></circle>
            <path
              d="M12 8c1.5 0 3 1 3 2.5s-1.5 2-3 2m0 4h.01"
              fill="none"
              stroke="currentColor"
              strokeMiterlimit="10"
              strokeWidth="2"
            ></path>
          </g>
        </svg>
      </button>
    </header>
      <ul className="akun-list">
        <li onClick={() => Navigate("/Akun/Profil")}>
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
        <li className="logout">
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
