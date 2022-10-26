import { Container, Stack, Button, Space } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Menu() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  return (
    <Container>
      <Stack
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          height: 300,
        })}
      >
        <Button
          variant="outline"
          onClick={() => {
            navigate("/table", { replace: true });
          }}
        >
          Upcoming Outdates
        </Button>
        <Space w="md" />
        <Button variant="outline">Dashboard</Button>
        <Space w="md" />
        <Button
          variant="outline"
          onClick={() => {
            navigate("/iteminput", { replace: true });
          }}
        >
          Scan Product
        </Button>
      </Stack>
    </Container>
  );
}
export default Menu;
