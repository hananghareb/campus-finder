import { useEffect } from "react";
import { createContext, useState } from "react";
export const authcontext = createContext()
export function Authprovider( {children}){

 
    const [token, settoken] = useState(null)


    useEffect(function(){
        if(localStorage.getItem('tkn') !== 'null'){
            settoken(localStorage.getItem('tkn'))
        }

    },[])


    return <authcontext.Provider value={{token,settoken }}>
    
    {children}

    </authcontext.Provider>
}
