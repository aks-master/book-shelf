import Container from "react-bootstrap/Container";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";

function Booklist() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://localhost:4001/api/v1/book/getreviews?userid=${user._id}`)
      .then((res) => {
        // console.log(res);
        setReviews(res.data);
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
            {reviews.map((review) => {
              return (
                <li
                  className="list-group-item"
                  key={review.id}
                >{`by:${review.username}, ${review.review}, ${review.rating} Stars`}</li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default Booklist;
