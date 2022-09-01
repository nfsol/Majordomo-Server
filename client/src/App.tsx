import { MantineProvider } from "@mantine/core";
import { useSetState, useLocalStorage } from '@mantine/hooks';
import { Outlet} from "react-router-dom";

import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";

import "./App.css";


export default function App() {

  const [user, setUser] = useSetState({name:""})
  const authedLinks = [
    { link: "/menu/", label: "Menu" },
    { link: "/user/logout/", label: "Sign Out" },
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
      <HeaderResponsive
        links={ user ? authedLinks : defaultLinks}
      />
      <Outlet />
      <FooterSimple
        links={user ? authedLinks : defaultLinks}
      />
    </MantineProvider>
  );
}
