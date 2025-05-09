// src/context/authentication.js

import { useEffect, useState, createContext } from "react";

export const authcontext = createContext();

export function Authprovider({ children }) {
  const [token, settoken] = useState(null);
  const [displayName, setdisplayName] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("tkn");
    const storedName = localStorage.getItem("displayName");

    if (storedToken && storedToken !== "null") {
      settoken(storedToken);
    }

    if (storedName && storedName !== "null") {
      setdisplayName(storedName);
    }
  }, []);

  return (
    <authcontext.Provider value={{ token, settoken, displayName, setdisplayName }}>
      {children}
    </authcontext.Provider>
  );
}
