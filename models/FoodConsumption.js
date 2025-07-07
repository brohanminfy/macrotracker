import mongoose from 'mongoose'

const FoodConsumptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  vegOrNonVeg: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
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

export default mongoose.model('FoodConsumption', FoodConsumptionSchema)