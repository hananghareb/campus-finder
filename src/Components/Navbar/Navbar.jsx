import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authcontext } from './../../context/authentication';
import axios from 'axios';
import './Navbar.css';

export default function Navbar() {
  const { token, settoken, displayName, setdisplayName } = useContext(authcontext); // إضافة displayName و setdisplayName هنا
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: '',
    imageProfileUrl: '',
  });

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem('tkn');
    localStorage.removeItem('displayName'); // حذف الـ displayName من localStorage
    settoken(null);
    setdisplayName(null); // مسح الـ displayName من الـ context
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
              <img className="img-nav" src={require('../../Images/logo2.png')} alt="logo" />
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
               <li className="nav-item">
  <NavLink
    to="/top10"
    className={({ isActive }) =>
      isActive ? 'nav-link top10-link active' : 'nav-link top10-link'
    }
  >
    Top 10<span className="trophy">🏆</span>
  </NavLink>
</li>

              </ul>

              <div className="nav-end ms-auto me-5 position-relative">
                <div className="user-info d-flex align-items-center" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-user ms-2 me-1"></i>
                  <h6 className="mb-0 ms-2">{displayName || 'User'}</h6> {/* استخدم displayName من الـ context هنا */}
                </div>

                {isDropdownOpen && (
                  <div className="user-menu position-absolute mt-2 end-0">
                    <div className="user-center">
                  {profileData.imageProfileUrl ? (
  <img
    src={profileData.imageProfileUrl}
    className="user-img"
    alt="User"
  />
) : (
  <div className="placeholder-icon-nav">
    <i className="fa-solid fa-user"></i>
  </div>
)}

                      <p className="user-name">{displayName || 'User'}</p> {/* استخدم displayName هنا كمان */}
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
