const express = require("express");

const router = express.Router();

const { Parking } = require("../models/parking.model");
const { Booking } = require("../models/booking.model");
const { errorTemplate } = require("../utilities/errorTemplate");

router.post("/find_places", async (req, res) => {
  let { lat, long, distance, disabled_slot } = req.body;

  try {
    let nearby_parkings = await Parking.find({
      loc: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lat), Number(long)],
          },
          $maxDistance: distance === undefined ? 1500 : distance,
        },
      },
      $or: [
        { car_slots_available: { $gt: 0 } },
        { bike_slots_available: { $gt: 0 } },
      ],
    })
      .lean()
      .exec();

    if (disabled_slot) {
      nearby_parkings = nearby_parkings.filter(
        (ele) => ele.disabled_slot && ele.disabled_slot_available > 0
      );
    }

    return res.status(200).json({
      error: false,
      data: {
        parkings: nearby_parkings,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
});

router.post("/book", async (req, res) => {
  let { body } = req;
  let { parking_id, slot } = body;

  try {
    let availability = await Parking.findOne({ _id: parking_id }).lean().exec();
    availability =
      slot == "car"
        ? availability.car_slots_available
        : slot == "bike"
        ? availability.bike_slots_available
        : availability.disabled_slot_available;

    if (availability == 0) {
      return errorTemplate(res, 400, "Opps! Parking Full");
    }

    let booking = await Booking.create(body);

    let to_update =
      slot == "car"
        ? { car_slots_available: availability - 1 }
        : slot == "bike"
        ? { bike_slots_available: availability - 1 }
        : { disabled_slot_available: availability - 1 };
    let updated = await Parking.findOneAndUpdate(
      { _id: parking_id },
      to_update,
      { new: true }
    )
      .lean()
      .exec();

    let socket = req.app.get("socket");
    socket.emit(parking_id, updated);

    return res.status(200).json({
      error: false,
      data: {
        booking,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
});

module.exports = { router };
