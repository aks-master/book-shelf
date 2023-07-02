import axios from "axios";
import { setupUserSuccess } from "./AuthActions";

export const setupUser = async (data, dispatch) => {
    dispatch(setupUserSuccess(data));

};
