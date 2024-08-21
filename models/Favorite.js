const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for favorites
const favoriteSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Ensure this matches your User model name
            required: true
        },
        movieName: {
            type: String,
            required: [true, 'You must specify a movie name'],
        },
        movieCover: {
            type: String,
            required: [true, 'You must specify a movie image'],
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Export the model
module.exports = mongoose.model('Favorite', favoriteSchema);
