import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
export const Logout = () => {
  

  // const [data, setData] = useState([]);  const getData = async () => {
  //   const { data } = await axios.get(`https://yesno.wtf/api`);
  //   setData(data);
  // };


  const [response, setResponse] = useState('');
  const getResponse = async () => {
    const {status} = await axios.get("/user/logout");
    setResponse(status);
  }
  useEffect (() => {
    getResponse();
  }, [])

  // useEffect(() => {
  //   axios.get("/user/logout").then((res) => {
  //     if (res.status == 200) {
  //       //clear localstorage token
  //       console.log(res.status)
  //     }
  // }, []);
  
  
    return (
      <div>
        <h1>Success</h1>
        <Navigate to={"/"} />
      </div>
    );
  }