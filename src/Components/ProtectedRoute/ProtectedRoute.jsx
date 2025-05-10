import React from 'react'
import { useContext } from 'react'
import { authcontext } from '../../context/authentication'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
 const {token} =   useContext(authcontext)

    if(token==null){

        return <Navigate to={"/login"}></Navigate>
    }



  return<>
  
{children}

  </>
   
}
