import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authcontext } from '../../context/authentication'; // عدلي المسار لو مختلف

export default function RedirectBasedOnAuth() {
  const { token } = useContext(authcontext);

  if (token) {
    return <Navigate to="/home" />;
  }

  return <Navigate to="/splash" />;
}
