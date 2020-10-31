const User = require("../models/User");
const Room = require("../models/Room");
const Chat = require("../models/Chat");

//Post chat message
module.exports.create = async (req, res) => {
  // Check if message is empty
  // const request = [req.user.id, req.body.recipient_id,req.body.message];
  // return res.json(request);
  if (req.body.message == null) {
    return res.status(400).json({
      success: false,
      msg: "Message cannot be empty",
    });
  }
  // Check if room already exists
  Room.findOne(
    {
      $and: [
        {
          users: { $in: req.user.id },
        },
        {
          users: { $in: req.body.recipient_id },
        },
      ],
    },
    (err, result) => {
      if (err) throw err;
      if (result != null) {
        // If exists, save chat using that room _id
        const newChat = new Chat({
          sender: req.user.id,
          room: result.id,
          message: req.body.message,
        });

        newChat.save().then((message) => {
          return res.status(201).json({
            success: true,
            msg: "Message saved",
            value: message,
          });
        });
      } else {
        // Create new room
        Room.create(
          {
            users: [req.user.id, req.body.recipient_id],
          },
          (err, result) => {
            if (err) throw err;
            Chat.create(
              {
                sender: req.user.id,
                room: result.id,
                message: req.body.message,
              },
              (err, message) => {
                if (err) throw err;
                res.status(201).json({
                  success: true,
                  msg: "Message saved",
                  value: message,
                });
              }
            );
          }
        );
      }
    }
  );
};

module.exports.getAll = async (req, res) => {
  await Chat.find({ room: req.room })
    // .populate("room")
    .then((messages) => {
      const resPayload = messages.map((item, index) => {
        return {
          msg: item.message,
          sender: item.sender,
          date: item.created_at,
        };
      });
      res.status(200).json({
        success: true,
        messages: resPayload,
      });
    });
};
