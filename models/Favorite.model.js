const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A like must have a user']
    },
    rent: {
      type: mongoose.Types.ObjectId,
      ref: 'Rent',
      required: [true, 'A like must have a rent']
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