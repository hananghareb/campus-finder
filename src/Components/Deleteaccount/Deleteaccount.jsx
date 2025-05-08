
import React from 'react';
import './Deleteaccount.css';

export default function DeleteAccount() {
  return (
    <div className="delete-account-page">
      <div className="delete-account-box text-center">
        <h3 className='text-center'>Delete Account</h3>
        <p>Are you sure you want to delete your account?</p>
        <div className="delete-account-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="ok-btn">Ok</button>
        </div>
      </div>
    </div>
  );
}
