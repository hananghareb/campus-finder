import React from 'react'
import './Forgetpassword.css'

export default function Forgetpassword() {
  return <>
  
  
  <div className="container d-flex justify-content-center align-items-center vh-100">

    <div className="row">
        <div className="col-md-6">
            <div className="pic border-end pe-4 border-dark">
                <img className='w-100 img-fluid' src={require('../../Images/Frame 1223.png')} alt="forgetpass" />

            </div>

        </div>

        <div className="col-md-6  d-flex justify-content-center align-items-center mb-5 ">
            <div className="content ">

                <h1 className="maincolor  "> Forget Password ? </h1>
                <p className="text-center"> Please enter your email address to
                    <span className="text-center">  receive a verification code </span>
               </p>

               <label className='' htmlFor="email">Email </label>   
<input id='email' type="email" placeholder='Enter Email' className= ' mt-2 form-control mb-3 form-label rounded-4' />

<button   type='submit'  className=' mt-1 btn  w-100 main-bg-color text-white rounded-4 ' >

Verify
</button>

            </div>

        </div>
        
        </div>
        </div>
  </>
}
