import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../../styles.css';

const Navbar = () => {
  const Navigate = useNavigate();
  const Location = useLocation();
  
  return (
    <div className="dock">
      <button href="https://wa.me/81180103146?text=Halo admin, ada yang ingin saya tanyakan.">
        <svg 
          stroke="currentColor" 
          fill="currentColor" 
          stroke-width="0" 
          viewBox="0 0 256 256" 
          height="24" width="24" 
          xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88.12,88.12,0,0,1,190.54,65.93,87.39,87.39,0,0,1,215.65,120H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h24a24,24,0,0,1-24,24H136a8,8,0,0,0,0,16h56a40,40,0,0,0,40-40V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm128,56a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24v56Z">
          </path>
        </svg>
        <span className="dock-label">Live Agent</span>
      </button>

      <button 
        className={Location.pathname === "/Home" ? "dock-active" : ""}
        onClick={() => Navigate("/Home")}
      >      
        <svg 
          className="size-[0.5em]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24">
        <g 
          fill="currentColor" 
          strokeLinejoin="miter" 
          strokeLinecap="butt">
        <polyline 
          points="1 11 12 2 23 11" 
          fill="none" 
          stroke="currentColor" 
          stroke-miterlimit="10" 
          strokeWidth="2">
        </polyline>
        <path 
          d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="square" 
          stroke-miterlimit="10" 
          strokeWidth="2">
        </path>
        <line 
          x1="12" y1="22" x2="12" y2="18" 
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="square" 
          stroke-miterlimit="10" 
          strokeWidth="2">
        </line>
        </g>
        </svg>
        <span className="dock-label">Home</span>
      </button>

      <button 
        className={Location.pathname === "/Akun" ? "dock-active" : ""}
        onClick={() => Navigate("/Akun")}
      >
        <svg 
          className="size-[0.5em]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24">
          <g 
            fill="currentColor" 
            strokeLinejoin="miter" 
            strokeLinecap="butt">
            <circle 
              cx="12" cy="8" r="4" 
              fill="none" 
              stroke="currentColor" 
              stroke-miterlimit="10" 
              strokeWidth="2">
            </circle>
            <path 
              d="M4 20c0-4 4-7 8-7s8 3 8 7" 
              fill="none" 
              stroke="currentColor" 
              stroke-miterlimit="10" 
              strokeWidth="2">
            </path>
          </g>
        </svg>
        <span className="dock-label">Akun</span>
      </button>
    </div>
  );
};

export default Navbar;