import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { setupUser } from "../authContext/setup";
import { AuthContext } from "../authContext/AuthContext";
import { useNavigate } from "react-router-dom";

import formImg from "../assets/undraw_Bibliophile_re_xarc.png";
const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

function Login() {
  const { user, dispatch } = useContext(AuthContext);
  const [values, setValues] = useState(initialState);
  const [messgae, setMessage] = useState("");
  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);

  // console.log(dispatch);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    if (values.isMember) {
      //handle login
      // console.log("login");
      // console.log(values);
      const { email, password } = values;
      try {
        const res = await axios.post(
          "http://localhost:4001/api/v1/auth/login",
          { email, password }
        );
        setupUser(res.data, dispatch);
        navigate("/");
      } catch (error) {
        if (error.response.status === 401) {
          setMessage(error.response.data);
        }
        // console.log(error);
      }
    } else {
      //register
      // console.log("register");
      // console.log(values);
      const { username, email, password } = values;
      try {
        const res = await axios.post(
          "http://localhost:4001/api/v1/auth/register",
          { email, username, password }
        );
        setMessage("User Created, click already a member and login");
        navigate("/login");
      } catch (err) {
        // console.log(err);
        setMessage(err.response.data);
      }
    }
  };
  return (
    <div className="container">
      <h1 className="text-center m-5">
        {values.isMember ? "Login" : "Register"}
      </h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <p className="text-danger">{messgae}</p>
          <form onSubmit={onSubmit}>
            {!values.isMember && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary m-1">
              {values.isMember ? "login" : "register"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right-circle-fill mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </button>
            <small className="m-3 text-center m-3" onClick={toggleMember}>
              {values.isMember
                ? "Not a member yet? register"
                : "Already a member, login"}
            </small>
          </form>
        </div>

        <div className="col-md-6">
          <img
            src={formImg}
            alt="formImage"
            style={{ height: "50vh", width: "50vh" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
