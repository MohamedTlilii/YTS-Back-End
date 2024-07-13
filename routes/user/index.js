const express = require("express");
const route = express.Router();
const verifiedToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");

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













module.exports = route;
