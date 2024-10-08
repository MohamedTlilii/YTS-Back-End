const User = require("../../models/User");
const bcrypt = require("bcrypt");
// bcrypt
const jwt = require("jsonwebtoken");
// token
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    const SECRET_KEY = process.env.SECRET_KEY;
    let { email, password } = req.body;
    console.log("Login Attempt:", email); // Log login attempt

    let user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email); // Log user not found

      return res
        .status(401)
        .json({ status: false, error: "Wrong email or password" });
    }
    const testPassword = await bcrypt.compare(password, user.password);
    if (!testPassword) {
      console.log("Wrong password for user:", email); // Log wrong password

      return res
        .status(401)
        .json({ status: false, error: "Wrong email or password" });
    }
    let token = await jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });
    res.status(200).json({
      status: true,
      data: {
        token,
        isUser: user.isUser,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
        id: user._id,
      },
    });
  } catch (error) {
    console.log("Login error:", error); // Log error
    res.status(401).json({ status: false, error: "An error occurred during login" });
  }
};