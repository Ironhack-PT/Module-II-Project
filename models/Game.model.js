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
      enum: ['new', 'almost new', 'used'],
      default: 'New'
    },
    image: {
      type: [String],
      required: [true, ' Game image is mandatory'],
      // imageUrl: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['Retro games', 'Board games', 'Console games'],
    }
  },
  {
    timestamps: true
  }
)

  
gameSchema.virtual('rents', {
  ref: 'Rent',
  foreignField: 'game',
  localField: '_id',
  justOne: false
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game