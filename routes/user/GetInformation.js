const User = require('../../models/User');
const Favorite = require('../../models/Favorite');

module.exports = async (req, res) => {
    console.log("Route handler for /getInformation reached"); // Debug log

    try {
        const userId = req.auth.id;
        console.log("User ID:", userId); // Debug log

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        console.log("User Data:", user); // Debug log

        const favorites = await Favorite.find({ userId: userId });
        console.log("Favorites:", favorites); // Debug log

        const userWithFavorites = {
            ...user._doc,
            favorites: favorites
        };

        res.status(200).json({ status: true, data: userWithFavorites });
    } catch (error) {
        console.error("Error retrieving user info:", error); // Debug log
        res.status(500).json({ status: false, message: 'Server error', error });
    }
};
