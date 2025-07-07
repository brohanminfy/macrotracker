import express from 'express'
import {
  searchFoods,
  addFood,
  getAllFoods,
  logFoodConsumption,
  getFoodConsumption
} from '../controllers/foodController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.get('/search', authMiddleware, searchFoods)
router.get('/', authMiddleware, getAllFoods)
router.post('/', authMiddleware, addFood)
router.post('/log', authMiddleware, logFoodConsumption)
router.get('/consumption', authMiddleware, getFoodConsumption)

export default router