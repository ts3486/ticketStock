import * as actionTypes from "../actions/authActions";

const initialState = {
  //   token: localStorage.getItem("token"),
  isAuthenticated: null,
};

const authReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
  }

  return state;
};

export default authReducer;
