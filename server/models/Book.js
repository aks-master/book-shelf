const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    authors: { type: String, required: true },
    avgRating: { type: Number, required: true },
    ratingsCount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

