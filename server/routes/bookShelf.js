const router = require("express").Router();
const User = require("../models/User");

//getAllUser
router.get("/getbookshelf", async (req, res) => {
  let users = await User.find({});
  //   users= new Array(users);
  console.log(users);

  users = users.map((user) => {
    const { id, username, email } = user;
    return { id, username, email };
  });
  // console.log(users);
  res.json(users);
});

//getFriendsOfTheUser
router.post("/addtobookshelf", async (req, res) => {
  // console.log(re)
  let friends = [];
  let user = await User.findById(req.query.userid);
  console.log(user);
  res.json(user.friends);
});

router.post("/addtocr", async (req, res) => {
  // console.log(re)
  let friends = [];
  let user = await User.findById(req.query.userid);
  console.log(user);
  res.json(user.friends);
});
router.delete("/deletefrombookshelf", async (req, res) => {
  // console.log(re)
  let friends = [];
  let user = await User.findById(req.query.userid);
  console.log(user);
  res.json(user.friends);
});
module.exports = router;
