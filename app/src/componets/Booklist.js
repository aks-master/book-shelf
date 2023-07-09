import { useEffect, useState, useContext, useRef } from "react";
import "./booklist.css";
import ico from "../assets/favicon.ico";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";

function Booklist() {
  const [books, setBooks] = useState([]);
  const [listUpdated, setListUpdated] = useState(Math.random());
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    // console.log("bookshelf list rendered");
    
    fetch(`http://13.126.127.106:80/api/v1/book/getbookshelf?userid=${user._id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("got data", data);
        // const oldBooks=books;
        setBooks(data.array);
      });
  }, [listUpdated]);
  const refresh = () => {
    setListUpdated(Math.random());
  };
  const addToCr = (book) => {
    axios
      .post(
        `http://13.126.127.106:80/api/v1/book/addtocr?userid=${user._id}&bookid=${book.id}`
      )
      .then((res) => {
        // console.log(res);
        setListUpdated(Math.random());
      });
  };

  const saveReview = (bookid, bookname) => {
    // event.preventDefault();
    // console.log(bookid,bookname, rating, review);
    axios
      .post(`http://13.126.127.106:80/api/v1/book/addreview`, {
        userid: user._id,
        username: user.username,
        bookid: bookid,
        bookname: bookname,
        review: review ? review : "",
        rating: rating ? rating : 0,
      })
      .then((res) => {
        // console.log(res);
        setListUpdated(Math.random());
      });
  };
  const handletRating = (event) => {
    setRating(event.target.value);
  };
  const handleReview = (event) => {
    setReview(event.target.value);
  };

  return (
    <div className="container my-2">
      <div className="d-flex justify-content-center align-items-center">
        <h2 className="text-center">Your Book Shelf</h2>
        <span onClick={refresh} className="mx-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </span>
      </div>

      <div id="books" className="container">
        {/* {console.log(typeof books)} */}

        {books.map((book) => {
          return (
            // error when using react bootstrap, hence using normal bootstrap components
            <div className="row my-3" key={book.id}>
              <div className="col-md-4 d-flex" style={{ fontSize: "1rem" }}>
                <div className="book" style={{ width: "18rem" }}>
                  <img
                    className="book-img-top"
                    // smallThumbnail not loading.
                    // here optional chaining is used as some books does not have imageLinks
                    src={book.img ? book.img : ico}
                    alt=""
                  />
                  <div>
                    <p>TITLE: {book.title}</p>
                    <p>BY: {book.authors}</p>
                    <p>
                      AVG. RATINGS:{" "}
                      {book.avgRating ? book.avgRating : "not rated"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row my-2">
                  {/* if not in currently reading show button to add to currently reading else display a badge of currently reading */}
                  {!book.cr ? (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        addToCr(book);
                      }}
                    >
                      Add to Currently Reading
                    </button>
                  ) : (
                    <span className="badge badge-light text-dark">
                      You are currently reading this
                    </span>
                  )}
                </div>
                <div className="row my-2">
                  <div className="d-flex">
                    {`your rating:${book.rating}, your review:${book.review}`}
                  </div>
                  <label htmlFor="rating">Your rating</label>
                  <select
                    id="rating"
                    name="rating"
                    className="m-1"
                    onChange={handletRating}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <br />
                  <label htmlFor="review">Add/ edit your review</label>
                  <input
                    type="text"
                    name="review"
                    id="review"
                    className="m-1"
                    onChange={handleReview}
                  />
                  <br />
                  <button
                    className="btn btn-primary my-2"
                    onClick={() => {
                      saveReview(book.id, book.title);
                    }}
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Booklist;
