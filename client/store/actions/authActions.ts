import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

interface registrationData {
  username?: String;
  email: String;
  password: String;
}

//Login
export const login = (dispatch: any) => {
  dispatch({
    type: LOGIN_SUCCESS,
  });
};

//Register User
export const register = (dispatch: any) => {
  dispatch({
    type: REGISTER_SUCCESS,
  });
};
