import React, { useState } from "react";
import { Card, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessTokens";
import loginStyles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const onSubmit = async () => {
    const response = await login({
      variables: {
        email,
        password,
      },
    });

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
      console.log("accessToken set");
    }

    console.log("login info submitted", response);

    window.location.href = "/";
  };

  return (
    <div className={loginStyles.container}>
      <Card className={loginStyles.cardContainer}>
        <h1 className={loginStyles.title}>Login</h1>
        <FormControl margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email..."
          />
          <FormHelperText id="email"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            aria-describedby="pw"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password..."
          />
          <FormHelperText id="pw"></FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;
