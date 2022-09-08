import axios from "axios";
import { Navigate } from "react-router-dom";
export const Logout = () => {
  axios.get("/user/logout").then((res) => {
    if (res.status == 200) {
      //clear localstorage token
      console.log(res.status)
    }
    return (
      <div>
        <h1>Success</h1>
        <Navigate to={"/"} />
      </div>
    );
  });
};
