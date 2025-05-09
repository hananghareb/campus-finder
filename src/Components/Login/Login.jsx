import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authcontext } from '../../context/authentication';
export default function Login() {
  const {settoken} = useContext(authcontext)
  const navigate = useNavigate()
  let user = {
    email:"",
    password:"",
  }
  const [errmsg, seterrmsg] = useState(null)
  const [successmsg, setsuccessmsg] = useState(null)
  const [isloading, setisloading] = useState(false)

  async function loginUser(values){
    setisloading(true)

    seterrmsg(null)
    try{
      const {data} = await axios.post("https://campus-finder.runasp.net/api/Account/login",values ,{
        headers: {

          'Accept': 'text/plain',
          'Content-Type': 'application/json'
        }
        })

    console.log(data);

      if(data.status=="success"){
        localStorage.setItem('tkn' ,data.token)
        settoken(data.token)

              setsuccessmsg('Login Successfully');
              setTimeout(function(){
                navigate('/')
              },)

      }
    }

    catch (err) {
      if (err.response) {
        seterrmsg("email or password incorrect");
      } else {
        seterrmsg("Network error. Please try again later.");
      }
      console.log(err);
    }
    setisloading(false);
  }

 const formikobj = useFormik({
  initialValues:user,
  onSubmit: loginUser,
  validate:function(values){
    seterrmsg(null)

    const errors = {}
 

    if(values.email.includes('@')=== false || values.email.includes('.')=== false   ){
      errors.email = 'email invaild'
    }



    if (
      values.password.length < 6 ||
      values.password.length > 12 ||
      !/^[A-Z]/.test(values.password) ||
      !/\d/.test(values.password)
    ) {
      errors.password = 'Password must be 6-12 characters, start with a capital letter, and contain numbers';
    }
    return errors;

  }
 })


  return <>

<div className="login-screen">

<div className="nav-contain">
<div className="nav container">
<div className="logo">
  <img className="img-logo" src={require('../../Images/logo2.png')} alt="logo" />
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
<div className="nav-line "></div>
</div>
<div className="container  d-flex justify-content-center align-items-center vh-100">
  <div className="row mt-5">
      <div className="col-md-6 mt-5">
          <div className="pic   pe-4 border-dark">
              <img className='w-100 img-fluid mt-3 img-log  ' src={require('../../Images/Frame 1224.png')} alt="login" />
          </div>
      </div>
      <div className="col-md-6 p-5 mt-5">
          <div className="content">
          {errmsg ? <div className="alert alert-danger">{errmsg}</div> :""}
           {successmsg ? <div className="alert alert-success">{successmsg}</div> :""}

          <form onSubmit={formikobj.handleSubmit}>
<label className='' htmlFor="email">Email </label>   
<input   onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.email} id='email' type="email" placeholder='Enter Email' className= ' mt-2 form-control mb-3 form-label rounded-4' />

{formikobj.errors.email  && formikobj.touched.email ?  <div className="alert alert-danger"> {formikobj.errors.email} </div>
:"" }




<label htmlFor="password">Password </label> 
<input autoComplete='off'  onBlur={formikobj.handleBlur} onChange={formikobj.handleChange} value={formikobj.values.password} id='password' type="password" placeholder='Enter password' className=' mt-2 form-control mb-3 rounded-4' />

{formikobj.errors.password  && formikobj.touched.password?  <div className="alert alert-danger"> {formikobj.errors.password} </div>
:"" }


<div className='d-flex align-items-end flex-column mb-3'>
<Link className='maincolor ' to='/forget'>Forget Password...?</Link>

</div>
<button disabled ={ formikobj.isValid === false || formikobj.dirty === false}  type='submit'  className=' mt-4 btn  w-100 main-bg-color text-white rounded-4 buttonlogin ' >

Login
</button>

<div className="divider-container">
<div className="line"></div>
<span className="divider-text">Or Log In With</span>
<div className="line"></div>
</div>

<div className='social-icons'>
<i className="fa-brands fa-facebook facebook "></i>
<i className="fa-brands fa-twitter twitter"></i>
<i className="fa-brands fa-google google"></i>

</div>

<p  className=' text-center mt-3 '> Dont have an account ? <Link to="/register" className='maincolor'>create account</Link></p>


</form>



          </div>

      </div>
  </div>
</div>
</div>


 </>
}
