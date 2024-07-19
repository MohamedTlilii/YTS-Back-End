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
      default: "https://example.com/default_avatar.jpg",
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
    // Fields for resetting password
    // newPassword: {
    //   type: String,
    // },
    // confirmNewPassword: {
    //   type: String,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
