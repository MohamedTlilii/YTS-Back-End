const Favorite = require('../../models/Favorite');

module.exports = async (req, res) => {
    console.log("Route handler reached");  // Add this log to verify the route is hit
    
    try {
        const { userId, movieName, movieCover } = req.body;

        if (!userId || !movieName || !movieCover) {
            console.log("Missing fields:", { userId, movieName, movieCover });
            return res.status(400).json({ message: 'User, movie name, and movie image are required' });
        }

        const newFavorite = new Favorite({ userId, movieName, movieCover });
        await newFavorite.save();
        console.log("New favorite saved:", newFavorite);

        res.status(201).json({ message: 'Favorite added', favorite: newFavorite });
    } catch (error) {
        // console.error("Error occurred:", error);
        res.status(500).json({ message: 'Server error', error });
    }
};
