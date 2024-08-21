const express = require("express");
const route = express.Router();
const verifiedToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");
const path = require("path");

// register
route.post("/register", require("./register"));
// login
route.post("/login", require("./login"));




// get information
route.get("/getInformation", verifiedToken, require("./GetInformation"));

// update information
route.put("/updateInformation", verifiedToken, require("./updateInformation"));


// update user photo
route.put(
  "/updatePhoto",
  verifiedToken,
  upload.single("photo"),
  require("./updatePhoto")
);


// Forgot password - initiate reset process
route.post("/forgotPassword", require("./forgotPassword"));





// Serve the reset password page
route.post("/requestPasswordReset/:token", require("./requestPasswordReset"));




// Add favorite
route.post("/addFavorite/:userId", require("./addFavorite"));

// Delete favorite
route.delete("/removeFavorite/:userId/:movieId", require("./removeFavorite"));




module.exports = route;
