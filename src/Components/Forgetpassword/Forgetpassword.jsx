import React, { useState } from 'react'
import './Forgetpassword.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Forgetpassword() {

    let user = {
        email: "",
      }

      const navigate = useNavigate()



      const [errmsg, seterrmsg] = useState(null)
      const [successmsg, setsuccessmsg] = useState(null)
      const [isloading, setisloading] = useState(false)
      const [email, setEmail] = useState("");
      



    async function forgetpass(values){

        seterrmsg(null)
    
        try{
          const {data} = await axios.post("https://campus-finder.runasp.net/api/Account/ForgetPassword",values ,{
            headers: {
              
              'Accept': 'text/plain',
              'Content-Type': 'application/json'
            }
            })
          
          
        
        console.log(data);
        
          if(data.statusCode ==200 ){
    
            setsuccessmsg('A verification code has been sent to your email. Please check your Gmail account.');
        

            setTimeout(function(){
              navigate('/verify', {state:{email:values.email}})
            },3000)
    
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
        setisloading(false);
      }


 const formikobj = useFormik({
  initialValues:user,
  onSubmit:forgetpass,





  validate:function(values){
    seterrmsg(null)

    const errors = {}
    

    if(values.email.includes('@')=== false || values.email.includes('.')=== false   ){
      errors.email = 'email invaild'
    }



    return errors;

  }
 })

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
            <div className="pic  pe-4 border-dark">
                <img className='w-100 img-fluid mt-5 ' src={require('../../Images/Frame 1223.png')} alt="forgetpass" />

            </div>

        </div>

        <div className="col-md-6  d-flex justify-content-center align-items-center mb-5 ">
            <div className="content ">


 
            {errmsg ? <div className="alert alert-danger">{errmsg}</div> :""}
             {successmsg ? <div className="alert alert-success">{successmsg}</div> :""}

                <h1 className="maincolor  "> Forget Password ? </h1>
                <p className="text-center "> Please enter your email address to <br />
                    <span className="text-center me-5 ">  receive a verification code </span>
               </p>




               <form onSubmit={formikobj.handleSubmit}>
 
 



<label htmlFor="email">Email </label>   
<input  className= ' mt-2 form-control mb-3 form-label rounded-4'   onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} 
 value={formikobj.values.email} id='email' type="email" placeholder='Enter Email'  />

{formikobj.errors.email  && formikobj.touched.email ?  <div className="alert alert-danger"> {formikobj.errors.email} </div>
:"" }





<button disabled ={ formikobj.isValid === false || formikobj.dirty === false}  type='submit' className=' mt-1 btn  w-100 main-bg-color text-white rounded-4 ' >

Verify

</button>

</form>

            </div>

        </div>
        
        </div>
        </div>
  </>
}
