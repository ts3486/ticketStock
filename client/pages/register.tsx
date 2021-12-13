import React from "react";
import { useState } from "react";
import { FormControl, InputLabel, Input, FormHelperText, Button } from "@material-ui/core";
import { useRegisterMutation } from "../generated/graphql";
// import styles from "../styles/auth.module.css";

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

        <Button onClick={onSubmit}>Register</Button>
      </div>
    </div>
  );
};

export default Register;
