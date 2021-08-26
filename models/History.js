const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
