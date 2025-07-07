import express from 'express';
import { getDashboard ,getFood} from '../controllers/diaryController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', auth, getDashboard);

router.get('/foods',auth,getFood)

export default router;
