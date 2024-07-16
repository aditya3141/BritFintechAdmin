import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookiesConsent, setShowCookiesConsent] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (cookiesAccepted) {
      setShowCookiesConsent(false);
    }

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookiesConsent(false);
  };

  return (
    <div>
      <header className={`cs-site_header cs-style1 cs-sticky-header cs-primary_font ${isSticky ? "sticky" : ""}`}>
        <div className="cs-main_header">
          <div className="container">
            <div className="cs-main_header_in">
              <div className="cs-main_header_left">
                <div className={`cs-nav ${isMenuOpen ? "open" : ""}`}>
                  <ul className={`cs-nav_list`}>
                    <li id={splitLocation[1] === "about" ? "active" : ""}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/about"
                        onClick={handleNavLinkClick}
                      >
                        About BFA 
                 

                      </NavLink>
                    </li>
                    <li id={splitLocation[1] === "sponsors" ? "active" : "text-dark"}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/sponsors"
                        onClick={handleNavLinkClick}
                      >
                        Sponsors
                      </NavLink>
                    </li>
                    <li id={splitLocation[1] === "awards" ? "active" : "text-dark"}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/awards"
                        onClick={handleNavLinkClick}
                      >
                        Awards
                      </NavLink>
                    </li>
                    <li id={splitLocation[1] === "how-to-enter" ? "active" : "text-dark"}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/how-to-enter"
                        onClick={handleNavLinkClick}
                      >
                        How To Enter
                      </NavLink>
                    </li>
                    <li id={splitLocation[1] === "judges" ? "active" : "text-dark"}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/judges"
                        onClick={handleNavLinkClick}
                      >
                        Judges
                      </NavLink>
                    </li>
                    <li id={splitLocation[1] === "contact" ? "active" : "text-dark"}>
                      <NavLink
                        className={`nav-link ${isSticky ? "text-white-navlink" : "text-dark"}`}
                        to="/contact"
                        onClick={handleNavLinkClick}
                      >
                        Contact Us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={`nav-link d-none-sm ${isSticky ? "text-white-navlink" : ""}`}
                        to="/register-now"
                        onClick={handleNavLinkClick}
                      >
                        <span className="cs-btn_text d-none-sm cs-btn cs-style6 cs-rounded text-uppercase cs-medium cs-accent_border cs-accent_bg cs-white cs-accent_10_bg_hover cs-accent_40_border_hover cs-accent_color_hover text-center p-2">
                          Register For Awards
                        </span>
                      </NavLink>
                    </li>
                    {isMenuOpen && (
                      <li className="cs-close_icon">
                        <FontAwesomeIcon icon={faTimes} onClick={toggleMenu} />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="cs-main_header_center">
                <NavLink className="cs-site_branding" to="/">
                  <img
                    src={isSticky ? "../assets/img/logo-white.svg" : "../assets/img/logo.svg"}
                    width="200px"
                    alt="Logo"
                  />
                </NavLink>
              </div>
              <div className="cs-main_header_right">
                <div className="cs-toolbox">
                  <NavLink
                    to="/register-now"
                    className={`cs-toolbox_btn cs-accent_bg_2 cs-white_hover cs-accent_bg_hover text-white`}
                  >
                    <span style={{ color: "#fff" }}> Register For Awards</span>
                  </NavLink>
                </div>
              </div>
              <div className="cs-hamburger_menu" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {showCookiesConsent && (
        <div className="wrapper">
          <img src="../assets/img/cookies.png" alt="cookies consent" />
          <div className="content">
            <header>Cookies Consent</header>
            <p>
              We use cookies to improve your browsing experience and for marketing purposes.
            </p>
            <div className="buttons">
              <button className="item" onClick={acceptCookies}>
                I understand
              </button>
              <NavLink to="/privacy-policy" className="item">
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
