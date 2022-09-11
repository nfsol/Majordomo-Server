import { MantineProvider } from "@mantine/core";
//import { useSetState} from '@mantine/hooks';

import Layout from "./components/Layout";

import { UserContextProvider } from "./contexts/UserContext";

export default function App() {
  
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >

      <UserContextProvider>
        <Layout />
      </UserContextProvider>
    </MantineProvider>
  );
}
