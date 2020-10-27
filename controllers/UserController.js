const User = require("../models/User");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//get all users
module.exports.getAll = async function (req, res) {
  try {
    const response = await User.find();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
};
//create a user
module.exports.create = async (req, res) => {
  // const salt = await bcrypt.genSalt(10);
  const user = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  try {
    const newUser = await user.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findOne({
      email,
    });
    //if the email doesnt match any record
    if (!user)
      return res.status(400).json({
        message: "User doesn't Exist",
      });

    //if the req pwd is equal to user password generate token and send
    if (password == user.password) {
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, "auth_token", { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token: token });
      });
    } else {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    return res.json(error);
  }
};

//get a user by id
module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ msg: "User not found" });
  }
};

//delete a user
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "deleted successfully" });
  } catch (error) {
    return res.status(404).json({ msg: "User not found, thus not deleted" });
  }
};

//get authenticated user info
module.exports.me = async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.status(401).send({ message: "Error in Fetching user" });
  }
};
