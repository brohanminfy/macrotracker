import WeightLog from '../models/WeightLog.js'

export const logWeight = async (req, res) => {
  try {
    const { weight, date } = req.body
    
    const weightLog = await WeightLog.create({
      userId: req.user.id,
      weight,
      date
    })
    
    res.status(201).json(weightLog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getWeightLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query
    
    const query = { userId: req.user.id }
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }
    
    const weightLogs = await WeightLog.find(query).sort({ date: -1 })
    res.json(weightLogs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}