const Favorite = require('../../models/Favorite');

module.exports = async (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;

    try {
        // Remove the favorite from the database
        const result = await Favorite.deleteOne({ userId, movieId });
        if (result.deletedCount === 0) {
            return res.status(400).json({ status: false, message: 'Movie not in favorites' });
        }

        return res.status(200).json({ status: true, message: 'Favorite movie removed successfully' });
    } catch (error) {
        console.error('Error removing favorite movie:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};
