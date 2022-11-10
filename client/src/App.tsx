import { MantineProvider } from "@mantine/core";

import Layout from "./components/Layout";

export default function App() {

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Layout />
    </MantineProvider>
  );
}
