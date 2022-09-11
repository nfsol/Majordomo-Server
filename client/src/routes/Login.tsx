import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from 'react'
import {UserContext} from "../contexts/UserContext"

axios.defaults.withCredentials = true;

export function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const [authFail, setAuthFail] = useInputState("");
  const [email, setEmail] = useInputState("");
  const [password, setPassword] = useInputState("");
  
  const handleSignin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    axios
    .post("/user/login", {
      email: email,
      password: password,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      // console.log("res.data.message is: ", res.data.message)
      // create feedback area to make use of res.data.message
      setAuthFail(res.data.message);
      if (res.data.token) {
          userContext.setUser({token:res.data.token});
          navigate("/menu", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {authFail ? authFail : "Don't have an account yet? Speak with Tim."}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@thisplace.com"
          required
          onChange={(e: React.SyntheticEvent) => {
            setEmail(e);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e: React.SyntheticEvent) => {
            setPassword(e);
          }}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          onClick={(e: React.SyntheticEvent) => {
            handleSignin(e);
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
