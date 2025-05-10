import React, { useContext, useState } from 'react'
import './Verifypassword.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authcontext } from '../../context/authentication'

export default function Verifypassword() {


  const {settoken,token} = useContext(authcontext)


  
  const navigate = useNavigate()


  const location = useLocation(); 
  const [resetCode, setResetCode] = useState(["", "", "", "", "", ""]);
  const [errmsg, seterrmsg] = useState(null)
  const [successmsg, setsuccessmsg] = useState(null)


  

  const email = location.state?.email || ""; 


  async function Verifypass(){

    seterrmsg(null)

    try{
      const {data} = await axios.post("https://campus-finder.runasp.net/api/Account/check-reset-code"
        ,   { email, resetCode: resetCode.join("")}        
        
        ,

        {
        headers: {
          
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`

        }
        })
      
      
    
    console.log(data);
    if(data.response.statusCode === 200){
        settoken(data.token)
        setsuccessmsg('Verification successful! You will be redirected shortly.');

        setTimeout(function(){
          navigate('/newpass', { state: { email, resetCode: resetCode.join(""), token: data.token } })

        },2000)

      }
    }

    catch (err) {
      if (err.response) {
        seterrmsg(err.response.data.message);
      } else {
        seterrmsg("Network error. Please try again later.");
      }
      console.log(err);
    }
  }


  const handleInputChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;  

    const newResetCode = [...resetCode];
    newResetCode[index] = value;
    setResetCode(newResetCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !resetCode[index]) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };



  return <>
   <div className="nav-contain">
  <div className="nav container">
  <div className="logo">
    <img src={require('../../Images/logo2.png')} alt="logo" />
  </div>
  <div className="buttons mt-5 ">
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
        <div className="pic  pe-3 border-dark">
            <img className='w-100 mt-5 ' src={require('../../Images/Frame 1.png')} alt="forgetpass" />

        </div>

    </div>
    <div className="col-md-6">
        <div className="content mt-5">


    
        {errmsg ? <div className="alert alert-danger">{errmsg}</div> :""}
             {successmsg ? <div className="alert alert-success">{successmsg}</div> :""}

        <h1 className="maincolor d-flex justify-content-center align-items-center mt-5 "> Verify Password  </h1>

        <p className="text-center"> Please enter the 6 digit code sent to  <br />
                    <span className="text-center me-5"> {email} </span>
               </p>


 
               <div className="otp-container">
                {resetCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    className="otp-input"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(index, e)}
                  />
                ))}
              </div>

               <div className="d-flex  justify-content-center align-items-center mt-4 ">
               <p> I didn’t get code! <span className='maincolor spancode '>
                Resend code </span> </p>

               </div>

               <button     onClick={Verifypass}
   type='submit'      disabled={resetCode.includes('')}
   className=' mt-1 btn  w-100 main-bg-color text-white rounded-4 ' >

Verify
</button>

        </div>

    </div>
    
    </div>
    </div>

  </>
}
