import Food from '../models/Food.js'
import FoodConsumption from '../models/FoodConsumption.js'

export const searchFoods = async (req, res) => {
  try {
    const { search } = req.query
    const foods = await Food.find({
      name: { $regex: search, $options: 'i' }
    }).limit(20)
    res.json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body)
    res.status(201).json(food)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({})
    res.json(foods)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logFoodConsumption = async (req, res) => {
  try {
    const { foodId, quantity, vegOrNonVeg, mealType, date, time } = req.body
    
    const foodConsumption = await FoodConsumption.create({
      userId: req.user.id,
      foodId,
      quantity,
      vegOrNonVeg,
      mealType,
      date,
      time
    })
    
    const populatedConsumption = await FoodConsumption.findById(foodConsumption._id).populate('foodId')
    res.status(201).json(populatedConsumption)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFoodConsumption = async (req, res) => {
  try {
    const { date } = req.query
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const consumption = await FoodConsumption.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    }).populate('foodId')
    
    res.json(consumption)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}