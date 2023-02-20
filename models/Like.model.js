const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    game: {
      type: mongoose.Types.ObjectId,
      ref: 'Game',
      required: true
    },
    rent: {
      type: mongoose.Types.ObjectId,
      ref: 'Rent',
      required: true
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
    }
  }
)

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;