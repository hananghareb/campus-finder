import React from 'react'

export default function Createnewpass() {
  return  <>
  
  
  <div className="container d-flex justify-content-center align-items-center vh-100">

    <div className="row">
        <div className="col-md-6">
            <div className="pic border-end pe-4 border-dark">
                <img className='w-100 img-fluid' src={require('../../Images/Frame 1221 (1).png')} alt="ceratepass" />

            </div>

        </div>

        <div className="col-md-6  d-flex justify-content-center align-items-center mb-5 ">
            <div className="content ">

                <h1 className="maincolor  ">  Create New Password </h1>
             

               <label className='mt-2' htmlFor="password">New Password </label>   
<input id='password' type="password" placeholder='Enter your password' className= ' mt-2 form-control mb-3 form-label rounded-4' />


<label className='' htmlFor="password">Confirm Password </label>   
<input id='password' type="password" placeholder='Enter your password' className= ' mt-2 form-control mb-3 form-label rounded-4' />

<button   type='submit'  className=' mt-3 btn  w-100 main-bg-color text-white rounded-4 ' >

Reset Password
</button>

            </div>

        </div>
        
        </div>
        </div>
  </>
}
