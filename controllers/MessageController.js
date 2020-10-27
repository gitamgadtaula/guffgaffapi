//create a user
module.exports.create = async (req, res) => {

  const room = new Room({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  });
  try {
    const newUser = await user.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res.json(error);
  }
};
