const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null) {
    return res.status(401).json({ message: "Auth Error, no token is passed" });
  }
  try {
    const decoded = jwt.verify(token, "auth_token");
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
