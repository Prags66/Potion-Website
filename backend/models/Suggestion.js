import mongoose from 'mongoose'

const suggestionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true }, // denormalized for quick display
    text: { type: String, required: true },
    status: { type: String, enum: ['new', 'reviewed'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.model('Suggestion', suggestionSchema)
