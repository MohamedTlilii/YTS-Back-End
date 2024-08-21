const Favorite = require('../../models/Favorite');

module.exports = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find all favorites for the user
        const favorites = await Favorite.find({ userId });
        return res.status(200).json({ status: true, favorites });
    } catch (error) {
        console.error('Error getting favorites:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};
