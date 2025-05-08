import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../EditPro/EditPro';
import ChangePassword from '../Changepass/Changepass';
import axios from 'axios';
import './Settings.css';
import { authcontext } from '../../context/authentication';

export default function Settings() {
    const { token, settoken } = useContext(authcontext); 
  const [activeTab, setActiveTab] = useState('edit');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'edit':
        return <EditProfile />;
      case 'password':
        return <ChangePassword />;
      case 'delete':
        return (
          <div className="delete-overlay">
            <div className="delete-modal text-center">
              <h2 className='text-center'>Delete Account</h2>
              <p>Are you sure you want to delete your account?</p>

              {deleteMessage && (
                <div
                  style={{
                    marginBottom: '15px',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: messageType === 'success' ? 'green' : 'red',
                    backgroundColor: messageType === 'success' ? '#e0fbe0' : '#fde0e0',
                  }}
                >
                  {deleteMessage}
                </div>
              )}

              <div className="modal-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setDeleteMessage('');
                    setMessageType('');
                    setActiveTab('edit');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="ok-btn"
                  onClick={async () => {
                    const token = localStorage.getItem('tkn');

                    if (!token) {
                      setMessageType('error');
                      setDeleteMessage('You are not authenticated.');
                      return;
                    }

                    try {
                      const response = await axios.delete(
                        'https://campus-finder.runasp.net/api/Account/delete',
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                          },
                        }
                      );

                      setMessageType('success');
                      setDeleteMessage('Account deleted successfully.');

                      // ⏳ انتظار بسيط قبل التوجيه
                      setTimeout(() => {
                        localStorage.removeItem('tkn');
                        settoken(null)
                        navigate('/login'); // ⬅️ هنا بيحصل التوجيه
                      }, 1500);
                    } catch (error) {
                      console.error('Error deleting account:', error.response?.data || error.message);
                      setMessageType('error');
                      setDeleteMessage('Failed to delete account.');
                    }
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div
          className={`sidebar-item ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          <i className="fa-solid fa-pen me-2"></i> Edit Profile
        </div>
        <div
          className={`sidebar-item ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <i className="fa-solid fa-lock me-2"></i> Change Password
        </div>
        <div
          className={`sidebar-item ${activeTab === 'delete' ? 'active' : ''}`}
          onClick={() => setActiveTab('delete')}
        >
          <i className="fa-solid fa-trash me-2"></i> Delete Account
        </div>
      </div>

      <div className="content">{renderContent()}</div>
    </div>
  );
}
