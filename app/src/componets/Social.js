import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";
import axios from "axios";

function Booklist() {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(`http://13.126.127.106:80/api/v1/book/getreviews?userid=${user._id}`)
      .then((res) => {
        // console.log(res);
        setReviews(res.data);
      });
  }, []);
  return (
    <div className="container my-2">
      <section className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
        <h3>Social: book reviews from your friends</h3>
      </section>
      <div id="books" className="container">
        <div className="card" style={{ width: "18rem" }}>
          <ul className="list-group list-group-flush">
            {reviews.map((review) => {
              // console.log(review);
              return (
                <li className="list-group-item" key={review.id}>
                  <div className="text-dark" style={{ fontSize: "1rem" }}>
                    <p>
                      <b>By:</b> {review.username}
                    </p>
                    <p>
                      <b>Book:</b> {review.bookname}
                    </p>
                    <p>
                      <b>Review</b> {review.review}
                    </p>
                    <p>
                      <b>Ratings</b> {review.rating}
                    </p>
                  </div>
                  {/* {`by:${review.username}, book: ${review.bookname}, ${review.review}, ${review.rating} Stars`}</li> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Booklist;
