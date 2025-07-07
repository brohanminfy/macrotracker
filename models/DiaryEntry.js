import mongoose from 'mongoose';

const DiaryEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
  quantity: { type: Number, required: true }, // e.g., 2 servings or 150g
  mealType: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
  logDate: { type: Date, required: true },
}, { timestamps: true });

const DiaryEntry = mongoose.model('DiaryEntry', DiaryEntrySchema);
export default DiaryEntry;
