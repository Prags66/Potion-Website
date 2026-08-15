import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  },
  { timestamps: true }
)

// A user can only favorite the same quote once
favoriteSchema.index({ user: 1, quote: 1 }, { unique: true })

export default mongoose.model('Favorite', favoriteSchema)
