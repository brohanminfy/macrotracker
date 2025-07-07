import mongoose from 'mongoose'
import FoodConsumption from '../models/FoodConsumption.js'
import WaterConsumption from '../models/WaterConsumption.js'
import User from '../models/User.js'

export const getDashboard = async (req, res) => {
  try {
    const { date } = req.query
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const user = await User.findById(req.user.id)
    
    const foodData = await FoodConsumption.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $lookup: {
          from: 'foods',
          localField: 'foodId',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $group: {
          _id: '$userId',
          totalCalories: {
            $sum: {
              $multiply: [
                '$quantity',
                { $divide: ['$foodDetails.calories', '$foodDetails.weight'] }
              ]
            }
          },
          totalProtein: {
            $sum: {
              $multiply: [
                '$quantity',
                { $divide: ['$foodDetails.protein', '$foodDetails.weight'] }
              ]
            }
          },
          totalCarbs: {
            $sum: {
              $multiply: [
                '$quantity',
                { $divide: ['$foodDetails.carbs', '$foodDetails.weight'] }
              ]
            }
          },
          totalFat: {
            $sum: {
              $multiply: [
                '$quantity',
                { $divide: ['$foodDetails.fat', '$foodDetails.weight'] }
              ]
            }
          },
          entries: { $push: '$$ROOT' }
        }
      }
    ])
    
    const waterData = await WaterConsumption.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: startOfDay, $lte: endOfDay }
        }
      },
      {
        $group: {
          _id: '$userId',
          totalWater: { $sum: '$water' },
          entries: { $push: '$$ROOT' }
        }
      }
    ])
    
    const macros = foodData.length > 0 ? foodData[0] : {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      entries: []
    }
    
    const water = waterData.length > 0 ? waterData[0] : {
      totalWater: 0,
      entries: []
    }
    
    res.json({
      user: {
        name: user.name,
        targets: {
          calories: user.targetCalories,
          protein: user.targetProtein,
          carbs: user.targetCarbs,
          fat: user.targetFat,
          water: user.targetWater
        }
      },
      consumed: {
        calories: Math.round(macros.totalCalories),
        protein: Math.round(macros.totalProtein),
        carbs: Math.round(macros.totalCarbs),
        fat: Math.round(macros.totalFat),
        water: water.totalWater
      },
      remaining: {
        calories: user.targetCalories - Math.round(macros.totalCalories),
        protein: user.targetProtein - Math.round(macros.totalProtein),
        carbs: user.targetCarbs - Math.round(macros.totalCarbs),
        fat: user.targetFat - Math.round(macros.totalFat),
        water: user.targetWater - water.totalWater
      },
      foodEntries: macros.entries,
      waterEntries: water.entries
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}