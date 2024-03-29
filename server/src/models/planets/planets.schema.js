const mongoose = require("mongoose");

const PlanetSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", PlanetSchema);
