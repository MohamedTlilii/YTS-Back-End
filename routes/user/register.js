const User = require("../../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
    } = req.body;

    // Check if email already exists
    let existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        status: false,
        message: "This email is already in use, please try another one.",
      });
    }

    // Check if username already exists
    let existedUsername = await User.findOne({ userName });
    if (existedUsername) {
      return res.status(409).json({
        status: false,
        message: "This username is already in use, please try another one.",
      });
    }

    // Validate password
    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Password is required.",
      });
    }

    const validatePassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*@-_).{8,}$/.test(password);
    if (!validatePassword) {
      return res.status(400).json({
        status: false,
        message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({
      status: true,
      message: "User was created successfully.",
    });

  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during registration. Please try again later.",
    });
  }
};
