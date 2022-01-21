import React, { useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from "@material-ui/core";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessTokens";
// import styles from "../styles/auth.module.css";

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
  };

  return (
    <div className="posts-page">
      <div>
        <FormControl margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormHelperText id="email"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            aria-describedby="pw"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormHelperText id="pw"></FormHelperText>
        </FormControl>

        <Button onClick={onSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
