const mongoose = require("mongoose");

const LaunchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
  },
  customers: {
    type: [String],
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Launch", LaunchSchema);
