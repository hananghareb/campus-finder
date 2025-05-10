import React, { useState, useRef, useEffect } from 'react';
import './EditPro.css';
import axios from 'axios';

export default function EditProfile() {
  const [profile, setProfile] = useState({ username: '', email: '', imagePreview: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('tkn');

  useEffect(() => {
    axios.get('https://campus-finder.runasp.net/api/Account/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setProfile({
        username: res.data.userName || '',
        email: res.data.email || '',
        imagePreview: res.data.imageProfileUrl || '',
      });
    })
    .catch((err) => {
      console.error('Error fetching profile:', err);
    });
  }, [token]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfile((prev) => ({
        ...prev,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Username', profile.username);
    if (selectedFile) {
      formData.append('Image', selectedFile);
    }

    axios.put('https://campus-finder.runasp.net/api/Account/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      setMessage('Profile updated successfully!');
      setMessageType('success');
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile.');
      setMessageType('error');
    });
  };

  return (
    <div className="profile-container">
      <div className="content">
        <h3>Edit Profile</h3>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <div className="profile-pic" onClick={handleImageClick} style={{ cursor: 'pointer', position: 'relative' }}>
          {profile.imagePreview ? (
            <img src={profile.imagePreview} alt="Profile" />
          ) : (
            <div className="placeholder-icon">
              <i className="fa-solid fa-user-circle"></i>
            </div>
          )}
          <span className="edit-icon">
            <i className="fa-solid fa-pen"></i>
          </span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={handleInputChange}
            placeholder="Enter your Username"
          />

          <div className="buttons">
            <button type="button" className="cancel1-btn">Cancel</button>
            <button type="submit" className="save1-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
