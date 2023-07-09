const router = require("express").Router();
const User = require("../models/User");

//getAllUser
router.get("/getAllUsers", async (req, res) => {
  let users = await User.find({});
  //   users= new Array(users);
  // console.log(users);

  users = users.map((user) => {
    const { id, username, email } = user;
    return { id, username, email };
  });
  // console.log(users);
  res.json(users);
});

//getFriendsOfTheUser
router.get("/getfriends/", async (req, res) => {
  // console.log(re)
  let friends = [];
  let user = await User.findById(req.query.userid);
  // console.log(user);
  res.json(user.friends);
});

router.post("/addfriend", async (req, res) => {
  let user = await User.findById(req.query.userid);
  let friend = await User.findById(req.query.friendid);

  // console.log(user, friend.id, friend.username);
  //get details of friend ans add to user's friend list
  let { id, username, email } = friend;
  // console.log(id, username, email);
  user.friends.push({ id, username, email });
  //get details of user ans add to friend's friend list
  id = user.id;
  username = user.username;
  email = user.email;
  // console.log(id, username, email);
  friend.friends.push({ id, username, email });
  user.save();
  friend.save();

  res.json(user.friends);
});

module.exports = router;
