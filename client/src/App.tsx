import { MantineProvider } from "@mantine/core";
//import { useSetState} from '@mantine/hooks';
import { Outlet, useOutletContext} from "react-router-dom";
import { useState } from "react";
import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";


interface AuthContext {
  loggedIn: boolean,
  setLoggedIn: Function,
};


export default function App() {
  

  const [loggedIn,setLoggedIn] = useState<boolean>(false);
  

  const authedLinks = [
    { link: "/menu/", label: "Menu" },
    { link: "/logout/", label: "Sign Out" },
  ];
  const defaultLinks = [
    { link: "/login/", label: "Login" },
    { link: "/logout/", label: `Request Access` },
  ];
  return (
    <MantineProvider
    theme={{ colorScheme: "dark"}}
    withGlobalStyles
    withNormalizeCSS
    >

      <HeaderResponsive
        links={ loggedIn ? authedLinks : defaultLinks}
        />
      <Outlet context={[loggedIn, setLoggedIn]}/>
      <FooterSimple
        links={loggedIn ? authedLinks : defaultLinks}
        />
    </MantineProvider>
  );
}
export function useLoggedIn() {
  return useOutletContext<AuthContext>();}