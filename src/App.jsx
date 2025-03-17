import React, { Children } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login'
import Forgetpassword from './Components/Forgetpassword/Forgetpassword'
import Verifypassword from './Components/Verifypassword/Verifypassword'
import Createnewpass from './Components/Createnewpass/Createnewpass'
import Register from './Components/Register/Register'
import Navbar from './Components/Navbar/Navbar';

const myrouter = createBrowserRouter([
  {path :"navbar" , element: <Navbar/>},
      

    {path :"login" , element: <Login/>},
    {path :"forget" , element: <Forgetpassword/>},
    {path :"verify" , element: <Verifypassword/>},
    {path :"newpass" , element: <Createnewpass/>},
    {path :"register" , element: <Register/>},



   

  
]) 


export default function App() {

  return <>
      <RouterProvider router={myrouter}/>


  
  </>
}
