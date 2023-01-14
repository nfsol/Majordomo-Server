import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { showNotification } from '@mantine/notifications';
axios.defaults.withCredentials = true;

export const Logout = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [response, setResponse] = useState({});
  const getResponse = async () => {
    showNotification({ title:'Success',message: 'Logged Out!' });
    userContext.setUser(null);
    setResponse(await axios.get("/user/logout", { withCredentials: true }));
  };
  useEffect(() => {
    getResponse();
  }, []);

  return <>{response ? navigate("/") : <p>Waiting for Response...</p>}</>;
};
