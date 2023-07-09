import Container from "react-bootstrap/Container";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";

function Booklist() {
  const [books, setBooks] = useState([]);
  const [progress, setProgress] = useState(Math.random());
  const { user } = useContext(AuthContext);
  useEffect(() => {
    // console.log("cr rendered");
    axios
      .get(`http://localhost:4001/api/v1/book/getcr?userid=${user._id}`)
      .then((res) => {
        // console.log(res);
        setBooks(res.data);
        // setListUpdated(Math.random());
      });
  }, [progress]);
  const updateProgress = (bookid, progress) => {
    // console.log(bookid, progress);
    axios
      .post(
        `http://localhost:4001/api/v1/book/updateprogress?userid=${user._id}&bookid=${bookid}&progress=${progress}`
      )
      .then((res) => {
        // console.log(res.data);
        setProgress(Math.random());
        // setBooks(res.data);
        // setListUpdated(Math.random());
      });
  };
  const deleteBook = (bookid) => {
    // console.log(bookid);
    axios
      .delete(
        `http://localhost:4001/api/v1/book/deletefrombookshelf?userid=${user._id}&bookid=${bookid}`
      )
      .then((res) => {
        // console.log(res.data);
        setProgress(Math.random());
        // setBooks(res.data);
        // setListUpdated(Math.random());
      });
  };
  return (
    <Container className="my-2">
      <section className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
        <h1>Currently Reading</h1>
      </section>
      <div id="books" className="container">
        {/* {console.log(typeof books)} */}

        {books.map((book) => {
          return (
            // error when using react bootstrap, hence using normal bootstrap components
            <div className="row my-3" key={book.id}>
              <div className="col-md-6">
                <div className="book" style={{ width: "10rem" }}>
                  <img
                    className="book-img-top"
                    // smallThumbnail not loading.
                    // here optional chaining is used as some books does not have imageLinks
                    src={book.img ? book.img : "../../public/favicon.ico"}
                    alt=""
                  />
                  <div>
                    <h5>TITLE: {book.title}</h5>
                    <h6>BY: {book.authors}</h6>
                    <h6>
                      RATINGS:{" "}
                      {book.averageRating ? book.averageRating : "not rated"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h5>your current progress: {book.progress}% </h5>
                <small>Mark your Progress</small>
                <div className="d-flex justify">
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => {
                      updateProgress(book.id, 25);
                    }}
                  >
                    25%
                  </button>
                  <button
                    className="btn btn-info m-1"
                    onClick={() => {
                      updateProgress(book.id, 50);
                    }}
                  >
                    50%
                  </button>
                  <button
                    className="btn btn-warning m-1"
                    onClick={() => {
                      updateProgress(book.id, 75);
                    }}
                  >
                    75%
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => {
                      deleteBook(book.id);
                    }}
                  >
                    Mark finished and remove from your Book Shelf
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default Booklist;
