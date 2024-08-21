const User = require('../../models/User');

module.exports = async (req, res) => {
    // const userId = req.params.userId; // Or however you get the userId from the request
    const { userId, movieId } = req.params;

    try {
        // const { movieId } = req.body;

        // Find user by ID and update favorites
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }


        // Check if the movie is in favorites
        const isFavorite = user.favorites.some(fav => fav.movieId.toString() === movieId.toString());
        if (!isFavorite) {
            return res.status(400).json({ status: false, message: 'Movie not in favorites' });
        }

        // Remove the movie from the favorites array
        user.favorites = user.favorites.filter(fav => fav.movieId.toString() !== movieId.toString());

        // Save the updated user document
        await user.save();

        return res.status(200).json({ status: true, message: 'Favorite movie removed successfully' });
    } catch (error) {
        console.error('Error removing favorite movie:', error);
        return res.status(500).json({ status: false, message: 'Server error' });
    }
};