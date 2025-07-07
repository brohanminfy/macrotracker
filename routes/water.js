import express from 'express'
import { logWaterConsumption, getWaterConsumption } from '../controllers/waterController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/log', authMiddleware, logWaterConsumption)
router.get('/consumption', authMiddleware, getWaterConsumption)

export default router