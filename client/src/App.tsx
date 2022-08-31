import { MantineProvider } from "@mantine/core";
import { useSetState, useLocalStorage } from '@mantine/hooks';
import { Outlet} from "react-router-dom";

import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";

import "./App.css";


export default function App() {

  const [user, setUser] = useSetState({name:""})
  const authedLinks = [
    { link: "/login/", label: "Login" },
    { link: "Login", label: "Request Access" },
  ];
  const defaultLinks = [
    { link: "/login/", label: "Login" },
    { link: "Login", label: "Request Access" },
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
        links={[
          { link: "/login/", label: "Login" },
          { link: "Login", label: "Request Access" },
        ]}
      />
    </MantineProvider>
  );
}
