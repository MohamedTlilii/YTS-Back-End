const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  large_cover_image: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
