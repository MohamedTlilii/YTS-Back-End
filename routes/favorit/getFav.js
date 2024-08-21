const Favorite = require('../../models/Favorite'); 
module.exports = async (req, res) => {

    try {
        const { user_id } = req.params;

        const favorites = await Favorite.find({ user: user_id }).populate('movie');

        if (!favorites.length) {
            return res.status(404).json({ message: 'No favorites found for this user' });
        }

        res.status(200).json({ favorites });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


