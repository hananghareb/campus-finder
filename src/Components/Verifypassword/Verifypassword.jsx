import React from 'react'
import './Verifypassword.css'

export default function Verifypassword() {
  return <>
  
  <div className="container d-flex justify-content-center align-items-center vh-100">

<div className="row">
    <div className="col-md-6">
        <div className="pic border-end pe-3 border-dark">
            <img className='w-100 ' src={require('../../Images/Frame 1.png')} alt="forgetpass" />

        </div>

    </div>
    <div className="col-md-6">
        <div className="content">

        <h1 className="maincolor d-flex justify-content-center align-items-center mt-5 "> Verify Password  </h1>

        <p className="text-center"> Please enter the 4 digit code sent to 
                    <span className="text-center"> youremail@gmail.com </span>
               </p>

               <div className="otp-container">
                <input type="text" className="otp-input" maxlength="1" ></input>
                <input type="text" className="otp-input" maxlength="1" ></input>
                <input type="text" className="otp-input" maxlength="1" ></input>
                <input type="text" className="otp-input" maxlength="1" ></input>


               </div>

               <div className="d-flex  justify-content-center align-items-center mt-4 ">
               <p> I didn’t get code! <span className='maincolor spancode '> Resend code </span> </p>

               </div>

               <button   type='submit'  className=' mt-1 btn  w-100 main-bg-color text-white rounded-4 ' >

Verify
</button>

        </div>

    </div>
    
    </div>
    </div>
  
  
  </>
}
