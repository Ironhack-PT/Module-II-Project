const mongoose = require("mongoose");


const rentSchema = new mongoose.Schema({
  renter: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tenant: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  game: {
    type: mongoose.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  start: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end: {
    type: Date,
    default: Date.now,
    required: [true, "Must have end date"],
  },
  status: {
    type: String,
    enum:["Requested", "Reserved", "Denied", "Rented"],
    default: "Requested"
  }
});



const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;
