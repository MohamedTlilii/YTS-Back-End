const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  let SECRET_KEY = process.env.SECRET_KEY;
  let token = req.headers.token;

  if (!token) {
    return res.status(401).json({ status: false, error: "Unauthorized: Token is required" });
  }

  try {
    let verifiedToken = await jwt.verify(token, SECRET_KEY);
    if (!verifiedToken) {
      return res.status(401).json({ status: false, error: "Unauthorized: Invalid token" });
    } else {
      req.auth = { id: verifiedToken.id };
      return next();
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ status: false, error: "Forbidden: Token expired" });
    }
    return res.status(401).json({ status: false, error: "Unauthorized: Invalid token" });
  }
};
