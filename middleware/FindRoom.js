const Room = require("../models/Room");

module.exports = async function (req, res, next) {
  var users = [req.user.id, req.body.recipient_id];

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
        req.room = result._id;

        // res.send(result._id);
        next();
      } else {
        res.status(404).json({ msg: "No room found ", users: users });
      }
    }
  );

  //   try {
  //     var room = Room.findOne({
  //       //return if matches all the array elements without specific given order
  //       users: { $all: users },
  //     });
  //     res.room.id = room.id;
  //     next(); // res.send(room);
  //   } catch (e) {
  //     res.status(404).json({ msg: "No room found ", users: users });
  //   }
};
