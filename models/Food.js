import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  weight: { type: Number, required: true }, // e.g., per 100g
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  micronutrients: mongoose.Schema.Types.Mixed,
  isVeg: { type: Boolean, default: true }
});

const Food = mongoose.model('Food', FoodSchema);
export default Food;
