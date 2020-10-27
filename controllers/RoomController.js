const Room = require("../models/Room");

module.exports.create = async (req, res) => {
  const room = new Room({
    name: req.body.name,
    created_by: req.user.id,
  });
  try {
    const newRoom = await room.save();
    return res.status(200).json(newRoom);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).send(rooms);
  } catch (error) {
    res.send(error);
  }
};
