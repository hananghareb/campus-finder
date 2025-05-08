import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    userName: '',
    email: '',
    imageProfileUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('tkn'); // خدي التوكن من localStorage
      if (!token) return;

      try {
        const response = await axios.get('https://campus-finder.runasp.net/api/Account/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // هنا بنملي البيانات باللي جاي من الـ API
        setProfileData({
          userName: response.data.userName || '',
          email: response.data.email || '',
          imageProfileUrl: response.data.imageProfileUrl, // ممكن يكون null
        });
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <div className="profile-card shadow p-4 rounded-4">
        <h4 className="mb-4">Account Settings</h4>
        <div className="d-flex flex-column flex-md-row align-items-start">
          <div className="me-md-4 text-center mb-3">
            <img
              src={profileData.imageProfileUrl }
              className="avatar mb-2 text-center"
              alt="Avatar"
            />
          
          </div>
          <div className="flex-grow-1">
            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" defaultValue="Hanan" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" defaultValue="******" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.userName}
                    readOnly
                  />
                </div>
              
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profileData.email}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Bio</label>
                  <input type="text" className="form-control" defaultValue={"Lover of technology and creativity. 🚀"} placeholder="Short bio" />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input type="text" className="form-control" defaultValue="Eygpt" />
                </div>
                <div className="col-md-6">
  <label className="form-label text-center d-flex justify-content-center mt-1">Social</label>
  <div className="social-icons mt-2">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3 text-dark fs-4">
      <i className="bi bi-facebook"></i>
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3 text-dark fs-4">
      <i className="bi bi-twitter"></i>
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
      <i className="bi bi-instagram"></i>
    </a>
  </div>
</div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
