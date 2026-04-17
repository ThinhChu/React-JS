// import { INCREMENT, DECREMENT } from '../action/counterAction';
const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthStatus: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_LOGIN_USER_SUCCESS":
      console.log(action);

      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthStatus: true,
      };
    default:
      return state;
  }
};

export default userReducer;
