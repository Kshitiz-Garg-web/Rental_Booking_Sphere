const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  ceartAt: {
    type: Date,
    default: Date.now()
  },
  author:
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
