import React, { useState } from 'react'
import {useFormik} from 'formik'
import './Register.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


export default function Register() {

  const navigate = useNavigate()

  
  let user = {
    displayname: "",
    email: "",
    password: ""
  }



const [errmsg, seterrmsg] = useState(null)
const [successmsg, setsuccessmsg] = useState(null)
const [isloading, setisloading] = useState(false)
  
   async function registernewuser(values){

    setisloading(true)

    seterrmsg(null)
    try{
      const {data} = await axios.post("https://campus-finder.runasp.net/api/Account/register",values ,{
        headers: {
          
          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
        })
      
      
    
    console.log(data);
    
      if(data.codeverification ){

        setsuccessmsg('Account created successfully. Please verify your email.');


        setTimeout(function(){
          navigate('/login')
        },1000)

      }
    }

    catch (err) {
      if (err.response) {
        seterrmsg(err.response.data.errors);
      } else {
        seterrmsg("Network error. Please try again later.");
      }
      console.log(err);
    }
    setisloading(false);
  }

  

   
   


 const formikobj = useFormik({
  initialValues:user,
  onSubmit:registernewuser,





  validate:function(values){
    seterrmsg(null)

    const errors = {}
    if(values.displayname.length <4 || values.displayname.length > 20){
      errors.displayname = 'name must be at leat 4 character to 10 character'
    }

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
             <div className="pic  pe-4 border-dark">
                 <img className='w-100 img-fluid' src={require('../../Images/Frame 965 (1).png')} alt="Register" />
 
             </div>
 
         </div>
         <div className="col-md-6 p-5">
             <div className="content">

 
             {errmsg ? <div className="alert alert-danger">{errmsg}</div> :""}
             {successmsg ? <div className="alert alert-success">{successmsg}</div> :""}
             <form onSubmit={formikobj.handleSubmit}>
 
 
 
             <label className='' htmlFor="displayname"> Name </label>   
 <input   onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.displayname} id='displayname' type="name" placeholder='Enter name' className= ' mt-2 form-control mb-3 form-label rounded-4' />
 
 {formikobj.errors.displayname  && formikobj.touched.displayname ?  <div className="alert alert-danger"> {formikobj.errors.displayname} </div>
 :"" }

 
 <label className='' htmlFor="email">Email </label>   
 <input   onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" placeholder='Enter Email' className= ' mt-2 form-control mb-3 form-label rounded-4' />
 
 {formikobj.errors.email  && formikobj.touched.email ?  <div className="alert alert-danger"> {formikobj.errors.email} </div>
 :"" }
 

 
 <label htmlFor="password">Password </label> 
 <input  onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="password" placeholder='Enter password' className=' mt-2 form-control mb-3 rounded-4' />
 
 {formikobj.errors.password  && formikobj.touched.password?  <div className="alert alert-danger"> {formikobj.errors.password} </div>
 :"" }

 
 
 
 <button disabled ={ formikobj.isValid === false || formikobj.dirty === false}  type='submit'  className=' mt-5 btn  w-100 main-bg-color text-white rounded-4 ' >
 
 Sign Up
 </button>
 
 <p  className=' text-center mt-3 '> Already have an account? <span className='maincolor'>Login</span></p>
 </form>
 
 
 
             </div>
 
         </div>
     </div>
 </div>
 
 
   
   </>


}


