const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    description: {
      type: String,
      maxLength: [320, 'Max description length is 320 characters'],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Game must have an owner']
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
      required: [true, ' Game image is mandatory']
    }
  },
  {
    timestamps: true
  }
)

const Game = mongoose.model('Game', gameSchema)

module.exports = Game