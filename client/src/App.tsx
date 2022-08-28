import { MantineProvider } from "@mantine/core";
//import { useSetState } from '@mantine/hooks';
import { Outlet} from "react-router-dom";

import { HeaderResponsive } from "./components/HeaderResponsive";
import { FooterSimple } from "./components/FooterSimple";

import "./App.css";


export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark"}}
      withGlobalStyles
      withNormalizeCSS
    >
      <HeaderResponsive
        links={[
          { link: "/login/", label: "Login" },
          { link: "Login", label: "Request Access" },
        ]}
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
