import mongoose from 'mongoose'

const WaterConsumptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  water: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('WaterConsumption', WaterConsumptionSchema)