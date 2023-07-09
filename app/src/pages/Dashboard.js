
import ReadingList from "../componets/ReadList";
import Social from "../componets/Social.js";
import { useEffect, useContext } from "react";
import { AuthContext } from "../authContext/AuthContext";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <ReadingList />
        </div>
        <div className="col">
          <Social />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
