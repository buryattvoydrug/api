const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    day1: {
      type: String,
      required: false,
    },
    time1: {
      type: String,
      required: false,
    },
    day2: {
      type: String,
      required: false,
    },
    time2: {
      type: String,
      required: false,
    },
    day3: {
      type: String,
      required: false,
    },
    time3: {
      type: String,
      required: false,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);