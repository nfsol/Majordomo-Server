import { MantineProvider } from "@mantine/core";
//import { useSetState} from '@mantine/hooks';
import { Outlet} from "react-router-dom";

import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";

import {AuthProvider} from "./contexts/AuthContext"
import { useState } from "react";


export default function App() {
  
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  
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
      <AuthProvider>

      <HeaderResponsive
        links={ loggedIn ? authedLinks : defaultLinks}
        />
      <Outlet />
      <FooterSimple
        links={loggedIn ? authedLinks : defaultLinks}
        />
        </AuthProvider>
    </MantineProvider>
  );
}
