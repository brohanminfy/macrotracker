import User from '../models/User.js'

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true, runValidators: true }
    )
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTargets = async (req, res) => {
  try {
    const { targetCalories, targetProtein, targetCarbs, targetFat, targetWater } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { targetCalories, targetProtein, targetCarbs, targetFat, targetWater },
      { new: true, runValidators: true }
    )
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}