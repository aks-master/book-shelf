import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import "./booklist.css";
import ico from "../assets/favicon.ico"

function Booklist() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    console.log("booklist rendered");
    fetch("http://localhost:4001/api/getBooksfromDB")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data.array);
      });
  }, []);
  return (
    <Container className="my-2">
      <h2 className="text-center">Your Book Shelf</h2>
      <div id="books" className="container">
        {console.log(typeof books)}

        {books.map((book) => {
          return (
            // error when using react bootstrap, hence using normal bootstrap components
            <div className="row my-3" key={book.id}>
              <div className="col-md-4">
                <div className="book" style={{ width: "18rem" }}>
                  <img
                    className="book-img-top"
                    // smallThumbnail not loading.
                    // here optional chaining is used as some books does not have imageLinks
                    src={book.img ? book.img : ico}
                    alt=""
                  />
                  <div>
                    <h5>TITLE: {book.title}</h5>
                    <h6>BY: {book.authors}</h6>
                    <h6>
                      AVG. RATINGS:{" "}
                      {book.averageRating ? book.averageRating : "not rated"}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="row my-2">
                  {/* if not in currently reading show button to add to currently reading else display a badge of currently reading */}
                  <button className="btn btn-success">
                    Add to Currently Reading
                  </button>
                </div>
                <div className="row my-2">
                  <form>
                    <label htmlFor="rating">
                      Your rating (1 to 5 step 0.5)
                    </label>
                    <input
                      type="range"
                      id="rating"
                      name="rating"
                      min={1}
                      max={5}
                      step={0.5}
                      className="m-1"
                      list="values"
                    />
                    {/* <datalist id="values">
                      <option value="1" label="1"></option>
                      <option value="2" label="2"></option>
                      <option value="3" label="3"></option>
                      <option value="4" label="4"></option>
                      <option value="5" label="5"></option>
                    </datalist> */}
                    <label htmlFor="review">Add/ edit your review</label>
                    <input
                      type="text"
                      name="review"
                      id="review"
                      className="m-1"
                    />
                    <button type="submit" className="btn btn-primary my-2">
                      save
                    </button>
                  </form>
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
