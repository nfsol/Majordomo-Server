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
  } from '@mantine/core';
  import { useInputState } from "@mantine/hooks";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext} from 'react'
import {UserContext} from "../contexts/UserContext"

  export function Signup() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [authFail, setAuthFail] = useInputState("");
    const [email, setEmail] = useInputState("");
    const [password, setPassword] = useInputState("");
    const [passwordMatch, setPasswordMatch] = useInputState("");
    const [name, setName] = useInputState("");

    const handleSignup = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      
      axios
      .post("/user/signup", {
        email: email,
        password: password,
        name: name,
        role: "default",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setAuthFail(res.data.message);
        if (res.data.token) {
            userContext.setUser({token:res.data.token});
            navigate("/menu/", { replace: true });
          }
        })
        .catch((err) => console.log(err));

    }

    return (
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          {password === passwordMatch ? "Don't have an account yet?" : "Passwords must match."}
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@youremail.com" required onChange={(e: React.SyntheticEvent) => {
            setEmail(e);
          }}/>
          <TextInput label="Name" placeholder="What should we call you?" required onChange={(e: React.SyntheticEvent) => {
            setName(e);
          }}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" onChange={(e: React.SyntheticEvent) => {
            setPassword(e);
          }}/>
          <PasswordInput label="Password Match" placeholder="Repeat Your password" required mt="md" onChange={(e: React.SyntheticEvent) => {
            setPasswordMatch(e);
          }}/>
          <Group position="apart" mt="md">
            
          </Group>
          <Button fullWidth mt="xl" onClick={handleSignup}>
            Sign up
          </Button>
        </Paper>
      </Container>
    );
  }
