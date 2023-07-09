import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext";

function Booksearch() {
  const { user } = useContext(AuthContext);
  const searchTermRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  // console.log("component rendered");

  useEffect(() => {
    if (searchTerm === "") return; //dont make api call
    fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        data.totalItems !== 0 ? setCards(data.items) : setCards([]);
      })
      .finally(() => {
        searchTermRef.current.value = "";
      });
  }, [searchTerm]);

  // there can be as many use effect as use require.
  // useEffect(()=>{
  //   console.log("initial");
  // },[]);

  function search() {
    setSearchTerm(searchTermRef.current.value);
  }

  function addBookToDB(book) {
    // console.log(book);
    const data = {
      id: book.id,
      title: book.volumeInfo.title,
      img: book.volumeInfo.imageLinks?.smallThumbnail
        ? book.volumeInfo.imageLinks?.smallThumbnail
        : null,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "",
      avgRating: book.volumeInfo.averageRating
        ? book.volumeInfo.averageRating
        : "0",
      ratingsCount: book.volumeInfo.ratingsCount
        ? book.volumeInfo.ratingsCount
        : "0",
    };
    // console.log(data);
    axios
      .post(
        `http://localhost:4001/api/v1/book/addtobookshelf?userid=${user._id}`,
        { data }
      )
      .then();
  }

  return (
    <>
      <section className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
        <h1>Search For books</h1>
        <div className="input-group">
          <input
            type="search"
            id="search-input"
            className="form-control rounded"
            placeholder="Enter book title"
            aria-label="Search"
            aria-describedby="search-addon"
            ref={searchTermRef}
          />
          <button
            type="button"
            onClick={() => {
              search();
            }}
            className="btn btn-outline-primary"
          >
            search
          </button>
        </div>
      </section>

      <div className="container">
        {/* {console.log(cards)} */}

        {cards.map((book) => {
          return (
            // error when using react bootstrap, hence using normal bootstrap components
            <div className="row my-3" key={book.id}>
              <div className="col-sm-6">
                <div className="book" style={{ width: "18rem" }}>
                  <img
                    className="book-img-top"
                    // smallThumbnail not loading.
                    // here optional chaining is used as some books does not have imageLinks
                    src={
                      book.volumeInfo.imageLinks?.thumbnail
                        ? book.volumeInfo.imageLinks?.thumbnail
                        : "../../public/favicon.ico"
                    }
                    alt=""
                  />
                  <div className="book-body">
                    <h5 className="book-title">{book.volumeInfo.title}</h5>
                    <h6>{book.volumeInfo.authors}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    addBookToDB(book);
                  }}
                >
                  Add to your books
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Booksearch;
