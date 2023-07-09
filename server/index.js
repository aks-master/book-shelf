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


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './static', 'index.html'));
});

app.listen(80,()=>{
    console.log("server running on 80");
})