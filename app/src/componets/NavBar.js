import { Link } from "react-router-dom";
import { AuthContext } from "../authContext/AuthContext";
import { logout } from "../authContext/AuthActions";
import { useContext } from "react";
function NavBar() {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          BookShelf
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Bookshelf" className="nav-link">
                your BookShelf
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/people" className="nav-link">
                People
              </Link>
            </li>
          </ul>
          <p className="m-3">Welcome, {user.username}</p>
          <Link to="/">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
