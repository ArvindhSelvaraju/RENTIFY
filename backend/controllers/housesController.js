const House = require("../models/houseModel");

// create a house
const createHouse = async (req, res) => {
  const { place, area, noOfBedrooms, noOfBathrooms, nearby, user_id } =
    req.body;

  // add doc to db
  try {
    const house = await House.create({
      place,
      area,
      noOfBedrooms,
      noOfBathrooms,
      nearby,
      user_id,
    });
    res.status(200).json(house);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all houses
const getHouses = async (req, res) => {
  const user_type = req.headers["usertype"];
  if (user_type === "Buyer") {
    const houses = await House.find({}).sort({ createdAt: 1 });
    res.status(200).json(houses);
  } else {
    const user_id = req.headers["userid"];
    const houses = await House.find({ user_id }).sort({ createdAt: 1 });
    res.status(200).json(houses);
  }
};

// update a house
const updateHouse = async (req, res) => {
  const { id } = req.params;

  const house = await House.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!house) {
    return res.status(400).json({ error: "No such house" });
  }
  res.status(200).json(house);
};

// delete a house
const deleteHouse = async (req, res) => {
  const { id } = req.params;

  const house = await House.findOneAndDelete({ _id: id });

  if (!house) {
    return res.status(400).json({ error: "No such house" });
  }
  res.status(200).json(house);
};


module.exports = { getHouses, createHouse, updateHouse, deleteHouse };
