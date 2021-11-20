const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      req: true,
    },
    loc: {
      type: Object,
      index: "2dsphere",
      required: true,
    },
    car_slots_available: {
      type: Number,
      required: true,
      min: 0,
    },
    bike_slots_available: {
      type: Number,
      required: true,
      min: 0,
    },
    disabled_slot: {
      type: Boolean,
      default: false,
    },
    disabled_slot_available: {
      type: Number,
      required: true,
      min: 0,
    },
    price_slabs: {
      car_slab: {
        type: [Number],
        required: true,
      },
      bike_slab: {
        type: [Number],
        required: true,
      },
      disabled_slab: {
        type: [Number],
        required: true,
      },
    },
    user_rating: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
  }
);

const Parking = mongoose.model("parking", parkingSchema);

module.exports = { Parking };
