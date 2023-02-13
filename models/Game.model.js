const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: [true, 'Game must have a price']
    },
    state: {
      type: String,
      required: [true, 'Game must have a state']
    },
    image: {
      type: String,
      required: [true, ' Game image is mandatory'],
      imageUrl: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  },
  {
    timestamps: true
  }
)

const Game = mongoose.model('Game', gameSchema)

module.exports = Game