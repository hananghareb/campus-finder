import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { authcontext } from '../../context/authentication';
import './Createnewpass.css'
export default function Createnewpass() {

  const location = useLocation();

  const token = location.state?.token || '';

  
  const navigate = useNavigate();
  const email = location.state?.email || ''  
  const resetCode = location.state?.resetCode || ''; 

  const [errmsg, seterrmsg] = useState(null);
  const [successmsg, setsuccessmsg] = useState(null);
  const [isloading, setisloading] = useState(false);

  async function handleNewPassword(values) {
    seterrmsg(null);
    setisloading(true);

    try {
      const { data } = await axios.post(
        'https://campus-finder.runasp.net/api/Account/reset-password',

        {
          email,
          resetCode,
          newPassword: values.newPassword,   
        },
        {
          headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
        }
      );

      console.log(data);

      if (data.statusCode === 200) {

        setsuccessmsg('Password reset successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      if (err.response) {
        seterrmsg(err.response.data.message);
      } else {
        seterrmsg('Network error. Please try again later.');
      }
      console.log(err);
    }
    setisloading(false);
  }

  
  
  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.newPassword || values.newPassword.length < 6) {
        errors.newPassword = 'Password must be at least 6 characters';
      }
     
      return errors;
    },
    onSubmit: handleNewPassword,
  });

  return <>
 <div className="nav-contain">
  <div className="nav container">
  <div className="logo">
    <img src={require('../../Images/logo2.png')} alt="logo" />
  </div>
  <div className="buttons mt-5">
    <Link to={'/login'}>
    <button className='login '>Login</button>

    </Link>

    <Link to={'/register'}>
    <button className='signup'>Sign Up</button>

    </Link>
  </div>
</div>

<div className="nav-line"></div>

  </div>
    
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row">
        <div className="col-md-6">
          <div className="pic pe-4 border-dark">
            <img className="w-100 img-fluid mt-5" src={require('../../Images/Frame 1221 (1).png')} alt="createpass" />
          </div>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center mb-5">
          <div className="content">
            <h1 className="maincolor">Create New Password</h1>

            {errmsg && <div className="alert alert-danger">{errmsg}</div>}
            {successmsg && <div className="alert alert-success">{successmsg}</div>}

            <form onSubmit={formik.handleSubmit}>
              <label className="mt-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="mt-2 form-control mb-3 rounded-4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
              />
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="alert alert-danger">{formik.errors.newPassword}</div>
              )}

             
      

              <button
                type="submit"
                className="mt-3 btn w-100 main-bg-color text-white rounded-4"
                disabled={!formik.isValid || !formik.dirty || isloading}
              >
                {isloading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>;
}
