import React from "react";
import { useState } from "react";
import { Card, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { useRegisterMutation } from "../generated/graphql";
import registerStyles from "../styles/Login.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  const onSubmit = async () => {
    const response = await register({
      variables: {
        email,
        username,
        password,
      },
    });

    console.log("registration info submitted", response);

    window.location.href = "/";
  };

  return (
    <div className={registerStyles.container}>
      <Card className={registerStyles.cardContainer}>
        <h1 className={registerStyles.title}>Register</h1>
        <FormControl margin="normal">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            aria-describedby="email"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email..."
          />
          <FormHelperText id="email"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            aria-describedby="username"
            onChange={(e: any) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter username..."
          />
          <FormHelperText id="username"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            aria-describedby="pw"
            type="password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter password..."
          />
          <FormHelperText id="pw"></FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
        <Button sx={{ marginTop: "1%" }} onClick={() => (window.location.href = "/register")}>
          Already have an account
        </Button>
      </Card>
    </div>
  );
};

export default Register;
