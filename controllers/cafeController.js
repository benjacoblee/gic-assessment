const { nanoid } = require("nanoid");
const Cafe = require("../models/cafe");
const Employee = require("../models/employee");
const { mapCafeEmployeesToNum } = require("../utils/cafe");
const uploadImgAndReturnUrl = require("../services/backblazeUploader");

const getCafes = async (req, res) => {
  const { location } = req.query;

  try {
    if (!location) {
      const cafes = await Cafe.find({}).lean();
      return res.status(200).json(mapCafeEmployeesToNum(cafes));
    }

    const cafes = await Cafe.find({ location }).lean();

    return res.status(200).json(mapCafeEmployeesToNum(cafes));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const createCafe = async (req, res) => {
  const { name, description, location } = req.body;
  const file = req.files[0];

  try {
    const cafe = await Cafe.create({
      _id: nanoid(),
      name,
      description,
      location
    });

    if (file) {
      const url = await uploadImgAndReturnUrl(file);

      if (url) {
        cafe.logoUrl = url;
        await cafe.save();
      }
    }

    return res.status(201).json(cafe);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const updateCafe = async (req, res) => {
  const { _id, name, description, location } = req.body;
  const file = req.files[0];

  try {
    const cafe = await Cafe.findOneAndUpdate(
      { _id },
      { name, description, location },
      { new: true }
    );

    if (file) {
      const url = await uploadImgAndReturnUrl(file);
      if (url) {
        const cafe = await Cafe.findOneAndUpdate(
          { _id },
          {
            logoUrl: url
          }
        );
        return res.status(200).json(cafe);
      }
    }

    return res.status(200).json(cafe);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const deleteCafe = async (req, res) => {
  const { _id } = req.body;

  try {
    await Cafe.findByIdAndDelete({ _id });
    await Employee.deleteMany({ cafe: _id });
    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe
};
