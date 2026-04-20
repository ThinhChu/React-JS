import {
  FETCH_LOGIN_USER_SUCCESS,
  FETCH_LOGOUT_USER_SUCCESS,
} from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    email: "",
    image: "",
    role: "",
  },
  isAuthStatus: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USER_SUCCESS:
      // console.log(action);
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          email: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthStatus: true,
      };
    case FETCH_LOGOUT_USER_SUCCESS:
      return {
        ...state,
        account: {
          access_token: null,
          refresh_token: null,
          username: null,
          email: null,
          image: null,
          role: null,
        },
        isAuthStatus: false,
      };
    default:
      return state;
  }
};

export default userReducer;
