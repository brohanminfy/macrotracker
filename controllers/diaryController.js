import DiaryEntry from '../models/DiaryEntry.js';
import mongoose from 'mongoose';
import Food from '../models/Food.js'

export const getDashboard = async (req, res) => {
  try {
    const { date } = req.query;
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const dailyData = await DiaryEntry.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          log_date: { $gte: start, $lte: end }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: 'food',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $group: {
          _id: '$user',
          total_calories: { $sum: { $multiply: ['$quantity', '$foodDetails.calories'] } },
          total_protein: { $sum: { $multiply: ['$quantity', '$foodDetails.protein'] } },
          total_carbs: { $sum: { $multiply: ['$quantity', '$foodDetails.carbs'] } },
          total_fat: { $sum: { $multiply: ['$quantity', '$foodDetails.fat'] } }
        }
      }
    ]);

    res.json(dailyData[0] || {});
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

export const getFood= async (req,res)=>{
  try {
    const search = req.query.search || '';
    
    const foods = await Food.find({
      name: { $regex: search, $options: 'i' }
    }).limit(20);

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
}