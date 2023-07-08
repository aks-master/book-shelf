const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    authors: { type: String, required: true },
    avgRating: { type: String, required: true },
    ratingsCount: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

// id: book.id,
//       title: book.volumeInfo.title,
//       img: book.volumeInfo.imageLinks?.smallThumbnail
//         ? book.volumeInfo.imageLinks?.smallThumbnail
//         : null,
//       authors: book.volumeInfo.authors
//         ? book.volumeInfo.authors.join(", ")
//         : "",
//       avgRating: book.volumeInfo.averageRating
//         ? book.volumeInfo.averageRating
//         : "0",
//       ratingsCount: book.volumeInfo.ratingsCount
//         ? book.volumeInfo.ratingsCount
//         : "0",
