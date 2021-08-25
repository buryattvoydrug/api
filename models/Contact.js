const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    type1: {
      type: String,
      required: false,
    },
    name1: {
      type: String,
      required: false,
    },
    phone1: {
      type: String,
      required: false,
    },
    post1: {
      type: String,
      required: false,
    },
    photo1: {
      type: String,
      required: false,
    },
    type2: {
      type: String,
      required: false,
    },
    name2: {
      type: String,
      required: false,
    },
    phone2: {
      type: String,
      required: false,
    },
    post2: {
      type: String,
      required: false,
    },
    photo2: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    days: {
      type: Array,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
