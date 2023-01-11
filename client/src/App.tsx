import { MantineProvider } from "@mantine/core";

import Layout from "./components/Layout";

export default function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          darkblue: [
            "#283A4A",
            "#203548",
            "#193146",
            "#112D44",
            "#0A2944",
            "#0E2538",
            "#11212F",
            "#121D27",
            "#121A21",
            "#11171D",
          ],
          orange: [
            "#CCA386",
            "#CD9167",
            "#D47F43",
            "#E36E1B",
            "#BA662A",
            "#9B5E33",
            "#825637",
            "#6E4F38",
            "#5E4838",
            "#514136"
          ],
          lightblue: [
            "#A6BBDC",
            "#85A6DA",
            "#6092DF",
            "#357DED",
            "#2F70D6",
            "#3768B4",
            "#3C6097",
            "#3F5880",
            "#3E516D",
            "#3C495E"
          ],
          yellowgreen: [
            "#C9D7B4",
            "#B8D097",
            "#ABCE78",
            "#9FD356",
            "#8FBF4D",
            "#80A54B",
            "#728D4C",
            "#65794A",
            "#5B6947",
            "#515B43"
          ]
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Layout />
    </MantineProvider>
  );
}
