const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  

    userName: {
      type: String,
      required: [true, "Please enter your Username 🥴 "],
    },
    password: {
      type: String,
    },
    // confirmPassword: {
    //   type: String,
    // },
    email: {
      type: String,
      required: [true, "Please enter your Email ✉️"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This is invalid email",
      ],
    },
    imageUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/ti/vecteur-libre/p3/12911441-icone-de-profil-d-avatar-par-defaut-dans-le-style-de-ligne-vectoriel.jpg",
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("users", userSchema);
