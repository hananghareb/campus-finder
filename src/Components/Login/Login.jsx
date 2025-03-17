import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import './Login.css';

export default function Login() {



  
  let user = {
    email:"",
    password:"",
  }



  const [errmsg, seterrmsg] = useState(null)
  const [successmsg, setsuccessmsg] = useState(null)
  const [isloading, setisloading] = useState(false)

  
   async function logintoaccount(values){
    console.log("hello");
    
  }










 const formikobj = useFormik({
  initialValues:user,
  onSubmit: logintoaccount,




  validate:function(values){
    seterrmsg(null)


    const errors = {}
 

    if(values.email.includes('@')=== false || values.email.includes('.')=== false   ){
      errors.email = 'email invaild'
    }



if(values.password.length <6 || values.password.length > 12){
  errors.password = 'password must be at leat 6 character to 12 character'

}
    return errors;

  }
 })


  return <>

 
<div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="row">
        <div className="col-md-6">
            <div className="pic border-end pe-4 border-dark">
                <img className='w-100 img-fluid' src={require('../../Images/Frame 1224.png')} alt="login" />

            </div>

        </div>
        <div className="col-md-6 p-5">
            <div className="content">

            <form onSubmit={formikobj.handleSubmit}>





<label className='' htmlFor="email">Email </label>   
<input   onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" placeholder='Enter Email' className= ' mt-2 form-control mb-3 form-label rounded-4' />

{formikobj.errors.email  && formikobj.touched.email ?  <div className="alert alert-danger"> {formikobj.errors.email} </div>
:"" }




<label htmlFor="password">Password </label> 
<input autoComplete='off'  onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="password" placeholder='Enter password' className=' mt-2 form-control mb-3 rounded-4' />

{formikobj.errors.password  && formikobj.touched.password?  <div className="alert alert-danger"> {formikobj.errors.password} </div>
:"" }




<button disabled ={ formikobj.isValid === false || formikobj.dirty === false}  type='submit'  className=' mt-5 btn  w-100 main-bg-color text-white rounded-4 ' >

Sign in
</button>

<p  className='maincolor text-center mt-3'>Forget password..?</p>
</form>



            </div>

        </div>
    </div>
</div>


  
  </>
}
