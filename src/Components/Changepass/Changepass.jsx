import React, { useState } from 'react';
import axios from 'axios';
import './Changepass.css';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New password and confirmation do not match');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.post(
        'https://campus-finder.runasp.net/api/Account/change-password',
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tkn')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Password changed successfully!');
      setMessageType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setMessage('Failed to change password. Please check your current password or try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="change-password-page">
      <div className="form-side">
        <h3 className='change-password-title'>Change password</h3>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form className='mt-2 form' onSubmit={handleSubmit}>
          <label>Current password</label>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label>New password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm new password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}
