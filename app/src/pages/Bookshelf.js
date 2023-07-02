import Booksearch from "../componets/Booksearch";
import BookList from "../componets/Booklist";

import { useEffect, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

function Bookshelf() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <Booksearch />
        </div>
        <div className="col-8">
          <BookList />
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
