import {Router} from 'express';
import { addConversation, addMessage, getConversation } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(protect ,getConversation);
router.route('/').post(protect ,addConversation);
router.route('/add-message').post(protect, addMessage);

export default router;