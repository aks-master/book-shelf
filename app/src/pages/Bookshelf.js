import Booksearch from "../componets/Booksearch";
import BookList from "../componets/Booklist";

import { useEffect, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

function Bookshelf() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Booksearch />
        </div>
        <div className="col-6">
          <BookList />
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
