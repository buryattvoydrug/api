const mongoose = require("mongoose");

const AwardSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    gold: {
      type: String,
      required: false,
    },
    silver: {
      type: String,
      required: false,
    },
    bronze: {
      type: String,
      required: false,
    },
    part: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Award", AwardSchema);
