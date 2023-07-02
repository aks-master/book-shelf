import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";

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
      <section className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
        <h3>Social: book reviews from your friends</h3>
      </section>
      <div id="books" className="container">
        <div className="card" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">r1</li>
            <li className="list-group-item">r2</li>
            <li className="list-group-item">r3</li>
            <li className="list-group-item">r4</li>
            <li className="list-group-item">r5</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Booklist;
