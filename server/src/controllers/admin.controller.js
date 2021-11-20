const express = require("express");
const router = express.Router();

const { Parking } = require("../models/parking.model");
const { errorTemplate } = require("../utilities/errorTemplate");

router.get("/parking_data/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let parking_data = await Parking.findById(id).lean().exec();

    return res.status(200).json({
      error: false,
      data: {
        parking_data,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
});

router.post("/create", async (req, res) => {
  let { body } = req;

  try {
    let created = await Parking.create(body);

    return res.status(200).json({
      error: false,
      data: {
        created,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
});

router.post("/slot_update", async (req, res) => {
  let { id, ...to_upadate } = req.body;

  try {
    let updated = await Parking.findOneAndUpdate(
      { _id: id },
      {
        ...to_upadate,
      },
      {
        new: true,
      }
    )
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        updated,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
});

module.exports = { router };
