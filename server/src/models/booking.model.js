const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    parking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parking",
      required: true,
    },
    user: {
      type: String,
      require: true,
    },
    slot: {
      type: String,
      enum: ["car", "bike", "disabled"],
    },
    mobile: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = { Booking };
