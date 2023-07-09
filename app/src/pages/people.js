import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../authContext/AuthContext";
function People() {
  const { user } = useContext(AuthContext);
  const [users, setusers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendsid, setfriendsid] = useState([]);

  // console.log(user);
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("http://localhost:4001/api/v1/people/getAllUsers")
        .then((res1) => {
          //dont show the logged in user.
          let data = res1.data.filter((x) => {
            return x.email !== user.email;
          });
          setusers(data);
          // console.log(users, res1);
        });
      axios
        .get(
          `http://localhost:4001/api/v1/people/getfriends?userid=${user._id}`
        )
        .then((res2) => {
          setFriends(res2.data);
          // console.log("pppp", res2.data, "ppp");
          let fid = res2.data.map((x) => {
            return x.id;
          });
          setfriendsid(fid);
        })
        .catch((err) => {
          // console.log(err);
        });
    };
    fetchdata();
  }, []);

  const addfriend = async (friendid) => {
    axios
      .post(
        `http://localhost:4001/api/v1/people/addfriend?userid=${user._id}&friendid=${friendid}`
      )
      .then((res3) => {
        // console.log(res3);
        setFriends(res3.data);
        let fid = res3.data.map((x) => {
          return x.id;
        });
        setfriendsid(fid);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  // console.log("******", users, friends, "*******");
  return (
    <div className="container">
      <div className="row">
        <div className="col" sm={6}>
          users list
          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              {users.map((user) => {
                return (
                  <li className="list-group-item" key={user.id}>
                    {`${user.username}, ${user.email}`}
                    {/* {console.log(friends)} */}
                    {friendsid.includes(user.id) ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addfriend(user.id);
                        }}
                      >
                        add frined
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col">
          friends list
          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              {friends.map((friend) => {
                return (
                  <li className="list-group-item" key={friend.id}>
                    {friend.username}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default People;
