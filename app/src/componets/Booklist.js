import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";

function Booklist() {
  const [books,setBooks]=useState([]);
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
      Booklist new
     <div id="books" className="container">
        {console.log(typeof books)}

        {books.map((book) => {
          return (
            // error when using react bootstrap, hence using normal bootstrap components
            <div className="row my-3" key={book.id}>
              <div className="col-sm-6">
                <div className="book" style={{ width: "18rem" }}>
                  <img
                    className="book-img-top"
                    // smallThumbnail not loading.
                    // here optional chaining is used as some books does not have imageLinks
                    src={book.img?book.img:"../../public/favicon.ico"}
                    alt=""
                  />
                  <div>
                    <h5>TITLE: {book.title}</h5>
                    <h6>BY: {book.authors}</h6>
                    <h6>RATINGS: {book.averageRating?book.averageRating:"not rated"}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row my-2">
                <button className="btn btn-success"
              >Add to Currently Reading</button>
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
