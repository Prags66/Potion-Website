import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    mood: { type: String, required: true }, // e.g. 'calm', 'energized', 'hopeful', 'reflective'
    lang: { type: String, required: true, default: 'en' }, // e.g. 'en', 'hi'
  },
  { timestamps: true }
)

export default mongoose.model('Quote', quoteSchema)
