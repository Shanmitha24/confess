const mongoose = require("mongoose");

const confessionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      default: "neutral",
    },
    anonymousName: {
      type: String,
      default: "Anonymous",
    },
    likes: {
      type: Number,
      default: 0,
    },
    reports: {
      type: Number,
      default: 0,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Confession", confessionSchema);
