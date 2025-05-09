import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authcontext } from './../../context/authentication';
import axios from 'axios';
import './Navbar.css';

export default function Navbar() {
  const { token, settoken } = useContext(authcontext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: '',
    imageProfileUrl: '',
  });

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('tkn');
    settoken(null);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('tkn');
      if (!token) return;

      try {
        const response = await axios.get('https://campus-finder.runasp.net/api/Account/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData({
          userName: response.data.userName || '',
          imageProfileUrl: response.data.imageProfileUrl || '',
        });
      } catch (error) {
        console.error('Error fetching navbar profile:', error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);

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
                <div className="user-info d-flex align-items-center" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-user ms-2 me-1"></i>
                  <h6 className="mb-0 ms-2">{profileData.userName || 'User'}</h6>
                </div>

                {isDropdownOpen && (
                  <div className="user-menu position-absolute mt-2 end-0">
                    <div className="user-center">
                      <img
                        src={profileData.imageProfileUrl || require('../../Images/profile.jpeg')}
                        className="user-img"
                        alt="User"
                      />
                      <p className="user-name">{profileData.userName || 'User'}</p>
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
