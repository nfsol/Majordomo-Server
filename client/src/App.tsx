import { MantineProvider } from "@mantine/core";
import { useSetState, useLocalStorage } from '@mantine/hooks';
import { Outlet} from "react-router-dom";

import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";

import {AuthContext} from "./contexts/AuthContext"


export default function App() {
  const [user, setUser] = useLocalStorage({key:'token', defaultValue:'null'});
  
  const authedLinks = [
    { link: "/menu/", label: "Menu" },
    { link: "/logout/", label: "Sign Out" },
  ];
  const defaultLinks = [
    { link: "/login/", label: "Login" },
    { link: "/login/", label: "Request Access" },
  ];
  return (
    <MantineProvider
      theme={{ colorScheme: "dark"}}
      withGlobalStyles
      withNormalizeCSS
    >
      <AuthContext.Provider value={{user,setUser}}>

      <HeaderResponsive
        links={ user !== 'null' ? authedLinks : defaultLinks}
        />
      <Outlet />
      <FooterSimple
        links={user !== 'null' ? authedLinks : defaultLinks}
        />
        </AuthContext.Provider>
    </MantineProvider>
  );
}
