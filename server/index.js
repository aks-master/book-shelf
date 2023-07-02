// server/index.js
const path = require('path');
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const app=express();
app.use(express.json());
app.use(cors());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './static')));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const authRoute = require("./routes/auth");
const peopleRoute = require("./routes/people");
const bookShelfRoute = require("./routes/bookShelf");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/people",peopleRoute);
app.use("/api/v1/book", bookShelfRoute);

const currentlyReading=[];

const Booklist=[{
  id: 'XtA-DwAAQBAJ',
  title: 'Hello!',
  img: 'http://books.google.com/books/content?id=XtA-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  authors: 'Dino Lingo',
  averageRating: undefined
},
{
  id: 'XtA-DwAAQBAJ',
  title: 'Hello!',
  img: 'http://books.google.com/books/content?id=XtA-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  authors: 'Dino Lingo',
  averageRating: undefined
}]
// Handle POST requests to /api route
app.post("/api/addBookToDB", (req, res) => {
  console.log("at server");
  console.log(req.body.book);
  let book=req.body.book;
  Booklist.push({id:book.id,title:book.volumeInfo.title,img:book.volumeInfo.imageLinks?.thumbnail,authors:book.volumeInfo.authors.join(",")
    ,averageRating: book.volumeInfo.averageRating});
  console.log(Booklist);
  res.json({ message: "book added!" });
//   res.end ('Hello, World!');
});

app.get('/api/getBooksfromDB',(req,res)=>{
  res.json({
    "array":Booklist});
res.end();
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static', 'index.html'));
});

app.listen(4001,()=>{
    console.log("server running on 4001");
})