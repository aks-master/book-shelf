
export const setupUserSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

//logout

export const logout = () => ({
  type: "LOGOUT",
});
