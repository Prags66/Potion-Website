import mongoose from 'mongoose'

const visitSchema = new mongoose.Schema(
  {
    deviceId: { type: String, required: true },
    date: { type: String, required: true }, // 'YYYY-MM-DD', one row per device per day
  },
  { timestamps: true }
)

// A device only gets one visit record per calendar day
visitSchema.index({ deviceId: 1, date: 1 }, { unique: true })

export default mongoose.model('Visit', visitSchema)
