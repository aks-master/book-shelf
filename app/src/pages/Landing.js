import { Link } from "react-router-dom";
import "./Landing.css";
function Landing() {
  return (
    <div className="d-flex text-center text-white bg-dark landing">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main className="px-3 mt-5">
          <h1>BookShelf</h1>
          <p className="lead">
            {" "}
            Welcome to BookShelf! <br />
            Read something new and share with others!
          </p>
          <Link to="/login">
          <button className="btn btn-lg btn-secondary font-weight-bold border-white bg-white">Login</button>
          </Link>
        </main>

        <footer className="mt-auto text-white-50">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.github.com/aks-master"
            className="text-decoration-none"
          >
            <p>&copy; aks-master on github </p>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
