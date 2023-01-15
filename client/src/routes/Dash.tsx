import {
  Container,
  Grid,
  SimpleGrid,
  Title,
  Text,
  Button,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
const PRIMARY_COL_HEIGHT = 300;

export function Dash() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Text
          color="dimmed"
          mt="md"
          sx={{
            'padding': '1rem',
            'border': "8px solid",
            "border-image":
              "linear-gradient(to bottom, darkblue, lightblue) 0 1",
          }}
        >
          <Title order={1} color="white">
            Welcome to Majordomo!
          </Title>{" "}
          In this demo you'll scan barcodes to enter product into a shared
          database, Then manage best before dates via a simple sortable
          list. Custom queries, categories, and admin role with dashboard coming
          soon!
        </Text>
        <Grid gutter="md">
          <Grid.Col>
            <Text color="dimmed" mt="md">
              Coming Soon: Custom search. Find product expiring between any two
              dates.
            </Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/iteminput", { replace: true });
              }}
            >
              Scan Product
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/upcoming", { replace: true });
              }}
            >
              Upcoming Outdates
            </Button>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
