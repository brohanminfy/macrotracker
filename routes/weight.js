import express from 'express'
import { logWeight, getWeightLogs } from '../controllers/weightController.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/log', authMiddleware, logWeight)
router.get('/logs', authMiddleware, getWeightLogs)

export default router