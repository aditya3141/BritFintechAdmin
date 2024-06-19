import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Import the Loader component

function Sidebar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (url) => {
    setLoading(true);
    navigate(url);
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="deznav">
        <div className="deznav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <a href="/Home" className="ai-icon" onClick={() => handleNavigation('/Home')}>
                <i className="flaticon-025-dashboard" />
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/Sponsor" className="has-arrow ai-icon" onClick={() => handleNavigation('/Sponsor')}>
                <i className="flaticon-022-copy" />
                <span className="nav-text">Sponsor</span>
              </a>
            </li>
            <li>
              <a href="/Register" className="has-arrow ai-icon" onClick={() => handleNavigation('/Register')}>
                <i className="flaticon-022-copy" />
                <span className="nav-text">Register</span>
              </a>
            </li>
            <li>
              <a href="/Contact" className="has-arrow ai-icon" onClick={() => handleNavigation('/Contact')}>
                <i className="flaticon-022-copy" />
                <span className="nav-text">Contact</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
