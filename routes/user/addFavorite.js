const User = require('../../models/User');

module.exports = async (req, res) => {
    const userId = req.params.userId; // Or however you get the userId from the request
    const movie = req.body.movie; // The movie data should be in the request body
  
    try {
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
  
      // Check if movie is already in favorites
      const isFavorite = user.favorites.some(fav => fav.movieId.toString() === movie.movieId.toString());
      if (isFavorite) {
        return res.status(400).json({ status: false, message: 'Movie already in favorites' });
      }
  
      // Create the favorite movie object
      const favoriteMovie = {
        movieId: movie.movieId,
        title: movie.title,
        large_cover_image: movie.large_cover_image
      };
  
      // Add the movie to the favorites array
      user.favorites.push(favoriteMovie);
  
      // Save the updated user document
      await user.save();
  
      return res.status(200).json({ status: true, message: 'Favorite movie added successfully' });
    } catch (error) {
      console.error('Error adding favorite movie:', error);
      return res.status(500).json({ status: false, message: 'Server error' });
    }
  };
  
