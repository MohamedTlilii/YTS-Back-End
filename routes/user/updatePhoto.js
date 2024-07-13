const User = require("../../models/User");
const path = require("path");

module.exports = async (req, res) => {
  try {
    let { id } = req.auth;
    if (!req.file) {
      return res.status(400).json({ status: false, message: "No file uploaded" });
    }

    const filePath = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    // console.log('File path:', filePath); 

    // Find the user by ID and update the imageUrl
    await User.findByIdAndUpdate(id, {
      $set: {
        imageUrl: filePath,
      },
    });

    res.status(200).json({
      status: true,
      message: "User photo was updated successfully",
      imageUrl:filePath
      //  `http://localhost:${process.env.PORT || 5000}/${filePath}` 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, error });
  }
};
