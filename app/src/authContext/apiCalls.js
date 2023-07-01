import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // const res =await fetch("/api/v1/auth/login",{method:"POST"})
    const res = await axios.post("http://localhost:4001/api/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    // const res =await fetch("/api/v1/auth/login",{method:"POST"})
    const res = await axios.post("http://localhost:4001/api/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

