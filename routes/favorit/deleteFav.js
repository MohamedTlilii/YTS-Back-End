const express = require('express');
const router = express.Router();
const Favorite = require('../../models/Favorite'); // Ensure this path is correct

// Define the function to handle deleting a favorite
const deleteFav = async (req, res) => {
    try {
        const { id } = req.params;

        const favorite = await Favorite.findByIdAndDelete(id);

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Favorite deleted', favorite });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Export the function to be used in index.js
module.exports = deleteFav;
