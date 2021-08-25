const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    day1: {
      type: String,
      required: true,
    },
    time1: {
      type: String,
      required: true,
    },
    day2: {
      type: String,
      required: true,
    },
    time2: {
      type: String,
      required: true,
    },
    day3: {
      type: String,
      required: true,
    },
    time3: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", GroupSchema);