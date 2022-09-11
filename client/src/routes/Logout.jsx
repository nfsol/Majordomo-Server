import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export const Logout = () => {
  
  const [response, setResponse] = useState({})
  const getResponse = async () => {
    setResponse(await axios.get("/user/logout",{withCredentials: true}))
    
    
  }
  useEffect (() => {
    getResponse();
  }, [])

 
  
  
    return (
      <div>
        <h1>Success</h1>
        {response ? <Navigate to={"/"} /> : <p>Waiting for Response...</p>}
      </div>
    );
  }