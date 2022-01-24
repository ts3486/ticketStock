import React from "react";
import { useState } from "react";
import { Card, FormControl, InputLabel, Input, FormHelperText, Button } from "@mui/material";
import { useRegisterMutation } from "../generated/graphql";
import registerStyles from "../styles/login.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  const onSubmit = async () => {
    console.log(email, password);

    const response = await register({
      variables: {
        email,
        password,
      },
    });

    console.log("registration info submitted", response);
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
          />
          <FormHelperText id="email"></FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            aria-describedby="pw"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
          <FormHelperText id="pw"></FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Card>
    </div>
  );
};

export default Register;
