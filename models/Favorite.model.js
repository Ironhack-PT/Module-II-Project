const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',

    },
    rent: {
      type: mongoose.Types.ObjectId,
      ref: 'Rent',

    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
    }
  }
)

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;