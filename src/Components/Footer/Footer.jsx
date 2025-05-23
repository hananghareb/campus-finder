import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import { authcontext } from '../../context/authentication'
export default function Footer() {
    const {token} = useContext(authcontext)
  
  return <>

  {token ? <>
    <div className="footer">
    <div className='footer-2 d-flex justify-content-around '>

    <div className="footer-content">
          <img src={require('../../Images/logo2.png')} alt="Campus Finder" /> 
          <p>We help you find your <br /> University</p>
      </div>

      <div className="social-media">
      <i  className="fab fa-facebook" />
      <i className="fab fa-instagram" />
        <i className="fab fa-twitter" />
        <i className="fab fa-linkedin" />
      </div>

      <div className="contact">
        <h3>Contact</h3>

        <div className="list ">
          <ul>
            <li>
            <i className="fas fa-map-marker-alt  "></i>
              127 King St, Melbourne den 3000, <br />
               <span className='text-center '>Australia</span> 

          
            </li>
            <li>
            <i className="fas fa-envelope  mt-2 "></i>
            Info@example.com

            
            </li>
            <li>
            <i className="fas fa-phone "></i>
            +49 999999999
            
            </li>
          </ul>
        </div>
      </div>


    </div>
    
   
      <div className="footer-bottom text-center ">
        <p>2024 all Right Reserved Term of use GREENMIND</p>
      </div>
    </div>
  </>: ""}
  
  
  </>
}
