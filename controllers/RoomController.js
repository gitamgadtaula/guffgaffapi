const Room = require("../models/Room");
const User = require("../models/User");

module.exports.create = async (req, res) => {
  //check if the recipent_id  exists
  if (req.body.recipent_id != null) {
    const room = new Room({
      name: `${req.user.id}+chats+${(req.user, req.body.recipent_id)}`,
      created_by: req.user.id,
      users: [req.user.id, req.body.recipent_id],
    });

    let recipent_user = await User.findById(req.body.recipent_id);
    if (recipent_user != null) {
      try {
        const newRoom = await room.save();
        return res.status(200).json(newRoom);
      } catch (error) {
        return res.json(error);
      }
    } else {
      return res.status(404).send("no user found");
    }
  } else {
    res.status(400).send("send recipent id");
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
