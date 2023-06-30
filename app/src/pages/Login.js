import { useState } from "react";
import formImg from "../assets/undraw_Bibliophile_re_xarc.png";
const initialState = {
  username: "",
  email: "",
  password: "",
  isMember: true,
};

function Login() {
  const [values, setValues] = useState(initialState);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <div className="container">
      <h1 className="text-center m-5">{values.isMember ? "Login" : "Register"}</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
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
