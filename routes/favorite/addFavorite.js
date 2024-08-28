const Favorite = require('../../models/Favorite');

module.exports = async (req, res) => {
    const userId = req.params.userId;
    const { movieId, title, large_cover_image, rating, genres
    } = req.body;

    try {
        // Check if the favorite already exists
        const existingFavorite = await Favorite.findOne({ userId, movieId });
        if (existingFavorite) {
            return res.status(400).json({ status: false, message: 'Movie already in favorites' });
        }

        // Create and save the new favorite
        const favorite = new Favorite({ userId, movieId, title, large_cover_image, rating, genres });
        await favorite.save();

        return res.status(200).json({ status: true, message: 'Favorite movie added successfully' });
    } catch (error) {
        console.error('Error adding favorite movie:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};
