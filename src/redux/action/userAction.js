export const FETCH_LOGIN_USER_SUCCESS = "FETCH_LOGIN_USER_SUCCESS";
export const FETCH_LOGOUT_USER_SUCCESS = "FETCH_LOGOUT_USER_SUCCESS";

export const doLogin = (data) => {
  return {
    type: FETCH_LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const doLogout = () => {
  return {
    type: FETCH_LOGOUT_USER_SUCCESS,
  };
};
