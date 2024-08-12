const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your Username"],
    },
    password: {
      type: String,
      required: [true, "Please enter your Password"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    imageUrl: {
      type: String,
      default: "https://t4.ftcdn.net/jpg/01/24/65/69/360_F_124656969_x3y8YVzvrqFZyv3YLWNo6PJaC88SYxqM.jpg",
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
