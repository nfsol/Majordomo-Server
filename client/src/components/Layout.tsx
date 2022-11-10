import { Outlet } from "react-router-dom";
import { HeaderResponsive } from "./HeaderResponsive";
import { FooterSimple } from "./FooterSimple";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";


const authedLinks = [
  { link: "/menu/", label: "Menu" },
  { link: "/logout/", label: "Log Out" },
];
const defaultLinks = [
  { link: "/login/", label: "Login" },
  { link: "/signup/", label: `Request Access` },
];

const Layout = () => {
  const userContext = useContext(UserContext);
  
  return (
    <>
      <HeaderResponsive links={userContext.user ? authedLinks : defaultLinks} />
      <Outlet />
      <FooterSimple links={userContext.user ? authedLinks : defaultLinks} />
    </>
  );
};
export default Layout;
