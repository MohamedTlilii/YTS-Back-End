// const express = require("express");
// const route = express.Router();
// const verifiedToken = require("../../middlewares/verifyToken");


// // Get favorite movies for a user
// route.get("/getFav/:userId",verifiedToken, require("./getFav"));


// // Add favorite movie
// route.post("/addFav", require("./addFav"));

// // Delete favorite movie
// route.delete("/deleteFav/:id", require("./deleteFav"));


// module.exports = route;
const express = require("express");
const router = express.Router();
const verifiedToken = require("../../middlewares/verifyToken");

// Define routes
router.get("/getFavorites/:userId", require("./getFavorites"));
router.post("/addFavorite/:userId", require("./addFavorite"));
router.delete("/removeFavorite/:userId/:movieId", require("./removeFavorite"));

module.exports = router;
