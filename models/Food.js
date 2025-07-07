import mongoose from 'mongoose'

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  weight: {
    type: Number,
    required: true,
    default: 100
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true,
    default: 0
  },
  carbs: {
    type: Number,
    required: true,
    default: 0
  },
  fat: {
    type: Number,
    required: true,
    default: 0
  },
  fiber: {
    type: Number,
    default: 0
  },
  sugar: {
    type: Number,
    default: 0
  },
  sodium: {
    type: Number,
    default: 0
  },
  isVeg: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export default mongoose.model('Food', FoodSchema)