import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Splash.css';
import { authcontext } from './../../context/authentication';

export default function SplashScreen() {
  const {token} = useContext(authcontext)
  const navigate = useNavigate();

  return (
    <>
{token? <div></div> : <div className="splash-screen">
      <div className="nav-contain">
        <div className="nav container">
          <div className="logo">
            <img src={require('../../Images/logo.png')} alt="logo" />
          </div>
          <div className="buttons mt-5">
            <Link to={'/login'}>
              <button className='login'>Login</button>
            </Link>
            <Link to={'/register'}>
              <button className='signup'>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
        <div className="text-box">
          <h1>
            Find Your <span className="highlight">University</span> and<br />
            majer here
          </h1>
          <p>Campus Finder help you to find perfect <br /> <span className='uni'>university and majer</span></p>
        </div>
      </div>}

      
    </>
  );
}
