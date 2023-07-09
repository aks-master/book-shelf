const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    username: { type: String, required: true },
    bookid: { type: String, required: true },
    bookname: { type: String, required: true },
    review: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
