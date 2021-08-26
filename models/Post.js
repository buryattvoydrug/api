const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
      unique: true,
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

module.exports = mongoose.model("Post", PostSchema);
