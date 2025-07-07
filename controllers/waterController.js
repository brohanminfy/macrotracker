import WaterConsumption from '../models/WaterConsumption.js'

export const logWaterConsumption = async (req, res) => {
  try {
    const { water, date, time } = req.body
    
    const waterConsumption = await WaterConsumption.create({
      userId: req.user.id,
      water,
      date,
      time
    })
    
    res.status(201).json(waterConsumption)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getWaterConsumption = async (req, res) => {
  try {
    const { date } = req.query
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const consumption = await WaterConsumption.find({
      userId: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay }
    })
    
    const totalWater = consumption.reduce((total, entry) => total + entry.water, 0)
    
    res.json({
      entries: consumption,
      totalWater
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}