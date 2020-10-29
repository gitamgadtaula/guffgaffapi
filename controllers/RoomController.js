const Room = require("../models/Room");
const User = require("../models/User");

module.exports.create = async (req, res) => {
  const room = new Room({
    name: `${req.user.id}+chats+${(req.user, req.user.recipient_id)}`,
    created_by: req.user.id,
    users: [req.user.id, req.body.recipient_id],
  });

  try {
    const newRoom = await room.save();
    return res.status(200).json(newRoom);
  } catch (error) {
    return res.json(error);
  }
};

module.exports.findRoom = async (req, res) => {
  var users = [req.user.id, req.body.recipient_id];
  var users_rev = users.reverse();
  if (req.body.recipient_id) {
    try {
      var room = await Room.findOne({
        //return if matches all the array elements without specific given order
        users: { $all: users },
      });

      res.send(room);
    } catch (e) {
      res.status(404).send("not found " + req.user.id);
    }
  } else {
    res.status(400).send("recipient id is needed");
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
