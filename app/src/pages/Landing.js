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
            <button className="btn btn-lg btn-secondary font-weight-bold border-white bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right mx-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              Login
            </button>
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
