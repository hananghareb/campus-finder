import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authcontext } from './../../context/authentication';
import './Navbar.css';

export default function Navbar() {
  const { token, settoken } = useContext(authcontext); // اضافه setToken من الـ context
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('tkn'); // حذف التوكن من الـ localStorage
    settoken(null); // تحديث الـ state في الـ context
    setDropdownOpen(false); // إغلاق الدروب داون
  };

  return (
    <>
      {localStorage.getItem('tkn') && (
        <nav className="navbar navbar-expand-lg">
          <div className="d-flex align-items-center w-100">
            <NavLink className="navbar-brand me-4 d-flex align-items-center" to="/">
              <img className="img-nav" src={require('../../Images/logo.png')} alt="logo" />
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav align-items-center mt-3">
                <li className="nav-item mx-2">
                  <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/allevents" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Events</NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Chat</NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/contactus" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact Us</NavLink>
                </li>
              </ul>

              <div className="nav-end ms-auto me-5 position-relative">
                <div className="user-info" onClick={toggleDropdown}>
                  <i className="fa-solid fa-user ms-2 me-1"></i>
                  <h6 className="mb-0">Hanan</h6>
                </div>

                {isDropdownOpen && (
                  <div className="user-menu position-absolute mt-2 end-0">
                    <div className="user-center">
                      <img src= {require('../../Images/profile.jpeg')} className="user-img" alt="User" />
                      <p className="user-name">Hanan</p>
                    </div>
                    <Link to={'/profile'} onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-link">
                        <div className="icon-circle me-2"><i className="fa-regular fa-user"></i></div>
                        Profile
                        <i className="fa-solid fa-chevron-right arrow-icon"></i>
                      </div>
                    </Link>

                    <Link to={'/settings'} onClick={() => setDropdownOpen(false)}>
                      <div className="dropdown-link">
                        <div className="icon-circle me-2"><i className="fa-solid fa-gear"></i></div>
                        Settings
                        <i className="fa-solid fa-chevron-right arrow-icon"></i>
                      </div>
                    </Link>

                    <Link to={'/login'} onClick={handleLogout}>
                      <div className="dropdown-link">
                        <div className="icon-circle me-2"><i className="fa-solid fa-arrow-right-from-bracket"></i></div>
                        Logout
                        <i className="fa-solid fa-chevron-right arrow-icon"></i>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
