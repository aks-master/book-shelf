const router = require("express").Router();
const User = require("../models/User");
const Book = require("../models/Book");
const Review = require("../models/Review");
//getbookshelf
console.log(Review);
router.get("/getbookshelf", async (req, res) => {
  let user = await User.findById(req.query.userid);
  let booklist = [];
  let currentlyReading = [];
  for (value of user.currentlyReading) {
    currentlyReading.push(value.bookid);
  }
  let reviews = await Review.find({});
  //get all the reviews by the user

  reviews = reviews.filter((obj) => {
    return obj.userid == req.query.userid;
  });
  console.log(reviews);
  // console.log(currentlyReading);
  for (value of user.bookshelf) {
    let found = await Book.findById(value);
    let review = null;
    for (rev of reviews) {
      // console.log(rev.bookid,"*",value);
      if (rev.bookid === value) {
        review = rev;
      }
    }
    if (!review) {
      review = {
        rating: 0,
        review: "",
      };
    }
    // console.log(review);
    let data = {
      id: found.id,
      title: found.title,
      img: found.img,
      authors: found.authors,
      avgRating: found.avgRating,
      ratingsCount: found.ratingsCount,
      cr: currentlyReading.includes(value) ? true : false,
      rating: review.rating,
      review: review.review,
    };
    booklist.push(data);
  }
  console.log("reached get bookshelf", booklist);
  res.json({
    array: booklist,
  });
});

//addtobookshelf
router.post("/addtobookshelf", async (req, res) => {
  console.log(req.query);
  console.log(req.body);
  let found = await Book.findById(req.body.data.id);
  let user = await User.findById(req.query.userid);
  if (!found) {
    const newBook = new Book({
      _id: req.body.data.id,
      title: req.body.data.title,
      img: req.body.data.img,
      authors: req.body.data.authors,
      avgRating: req.body.data.avgRating,
      ratingsCount: req.body.data.ratingsCount,
    });
    const book = await newBook.save();
    console.log(book);
  } else {
    // console.log("already in books database");
  }
  if (user.bookshelf.includes(req.body.data.id)) {
    // book already in users bookshelf
    console.log("book already in users bookshelf");
  } else {
    user.bookshelf.push(req.body.data.id);
    user.save();
    console.log("book added in users bookshelf");
  }
  res.send("OK");
});
//getcr
router.get("/getcr", async (req, res) => {
  let user = await User.findById(req.query.userid);
  let currentlyReading = [];
  let progress = [];
  for (value of user.currentlyReading) {
    currentlyReading.push(value.bookid);
    progress.push(value.progress);
  }
  console.log(currentlyReading);
  let i = 0;
  let cr = [];
  for (value of currentlyReading) {
    let found = await Book.findById(value);
    let data = {
      id: found.id,
      title: found.title,
      img: found.img,
      authors: found.authors,
      avgRating: found.avgRating,
      ratingsCount: found.ratingsCount,
      progress: progress[i++],
    };
    cr.push(data);
  }
  res.json(cr);
});
//addtocr
router.post("/addtocr", async (req, res) => {
  // console.log(req.query);
  let user = await User.findById(req.query.userid);
  //check if book is already in cr
  let currentlyReading = [];
  for (value of user.currentlyReading) {
    currentlyReading.push(value.bookid);
  }
  if (currentlyReading.includes(req.query.bookid)) {
    //do nothing
    res.json("book already in cr");
  } else {
    user.currentlyReading.push({ bookid: req.query.bookid, progress: 0 });
    user.save();
    res.json("book added to cr");
  }
});
router.post("/updateprogress", async (req, res) => {
  console.log(req.query);
  let user = await User.findById(req.query.userid);

  //not working
  // for (value of user.currentlyReading) {
  //   if(value.bookid===req.query.bookid){
  //     console.log("found");
  //     value.progress=Number.parseInt(req.query.progress);
  //   }
  // }

  //approach 2, this is working
  // 1.find the index
  // 2.use splice to replace it with new object
  let index = 0;
  for (value of user.currentlyReading) {
    if (value.bookid === req.query.bookid) break;
    index++;
  }
  user.currentlyReading.splice(index, 1, {
    bookid: req.query.bookid,
    progress: Number.parseInt(req.query.progress),
  });
  console.log(index);

  console.log(user);
  const data = await user.save();
  res.json(`progress updated with ${data}`);
});

router.delete("/deletefrombookshelf", async (req, res) => {
  //used when user clicks marked finisehd...

  let user = await User.findById(req.query.userid);
  user.bookshelf = user.bookshelf.filter((id) => {
    return id !== req.query.bookid;
  });
  user.currentlyReading = user.currentlyReading.filter((obj) => {
    return obj.bookid !== req.query.bookid;
  });
  user.save();
  res.json("book deleted");
});
//get  reviews
router.get("/getreviews", async (req, res) => {
  console.log("getting reviews");
  let user = await User.findById(req.query.userid);
  console.log(user);
  let friendsid = [];
  for (friend of user.friends) {
    friendsid.push(friend.id);
  }
  let reviews = await Review.find({});
  console.log(reviews);
  let rev = [];
  for (review of reviews) {
    if (friendsid.includes(review.userid)) {
      console.log("get");
      let data = {
        id: review._id,
        username: review.username,
        review: review.review,
        rating: review.rating,
      };
      rev.push(data);
    }
  }
  console.log(rev);

  res.json(rev);
});
//post reviews
router.post("/addreview", async (req, res) => {
  console.log("********", req.body, "*********");

  //check if a review alredy exist
  let found = false;
  let index = 0;
  let reviews = await Review.find({});
  for (review of reviews) {
    if (
      review.userid === req.body.userid &&
      review.bookid === req.body.bookid
    ) {
      found = true;
    }
    index++;
  }
  if (!found) {
    //new review
    const newReview = new Review({
      userid: req.body.userid,
      username: req.body.username,
      bookid: req.body.bookid,
      review: req.body.review ? req.body.review : "",
      rating: req.body.rating ? req.body.rating : 0,
    });
    const review = await newReview.save();
    res.status(201);
    res.json("review added");
  } else {
    //update old review

    await Review.findOneAndUpdate(
      { userid: req.body.userid, bookid: req.body.bookid },
      {
        userid: req.body.userid,
        username: req.body.username,
        bookid: req.body.bookid,
        review: req.body.review ? req.body.review : "",
        rating: req.body.rating ? req.body.rating : 0,
      }
    );
    res.status(200);
    res.json("review updated");
  }
});

module.exports = router;
