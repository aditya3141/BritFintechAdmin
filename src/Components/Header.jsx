import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode)); // Store dark mode preference
    document.body.classList.toggle('dark-mode', newMode); // Apply dark mode class to body
  };

  // Load dark mode preference from localStorage on component mount
  useEffect(() => {
    const darkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (darkMode !== null) {
      setIsDarkMode(darkMode);
      document.body.classList.toggle('dark-mode', darkMode); // Apply dark mode class to body
    }
  }, []);

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token doesn't exist
      navigate('/login');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.User_Name);
    }

    // Simulate loading time of 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      {/***********************************
      Nav header start
      ************************************/}
      <div className="nav-header">
        <a className="brand-logo" href="/Home">
          <img
            src={isDarkMode ? 'images/logo-white.svg' : 'images/logo-dark.svg'}
            style={{ height: '50px' }}
            className=" w-10"
            alt=""
          />
        </a>
        <div className="nav-control">
          <div className="hamburger">
            <span className="line" /><span className="line" /><span className="line" />
          </div>
        </div>
      </div>
      {/***********************************
      Nav header end
      ************************************/}
      {/***********************************
      Header start
      ************************************/}
      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">
                  BFA ADMIN
                </div>
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item dropdown notification_dropdown">
                  <button
                    className="nav-link bell dz-theme-mode active"
                    onClick={handleThemeToggle}
                  >
                    <i id="icon-light" className="fas fa-sun" />
                    <i id="icon-dark" className="fas fa-moon" />
                  </button>
                </li>
                <li className="nav-item dropdown header-profile">
                  <a
                    className="nav-link"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" />
                    <div className="header-info ms-3">
                      <span className="admin-loard">{userName}</span>
                      <small>Brit Fintech Admin</small>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <NavLink to="/" className="dropdown-item ai-icon" onClick={handleLogout}>
                      <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1={21} y1={12} x2={9} y2={12} />
                      </svg>
                      <span className="ms-2">Logout </span>
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
