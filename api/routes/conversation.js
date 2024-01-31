import express from 'express'
import { getConversations, deleteConversation, createConversation, getConversation } from '../controllers/conversation.controller.js'


const router = express.Router()

router.post('/',createConversation);
router.delete('/:id',deleteConversation);
router.get('/:id',getConversations);
router.get('/single/:id',getConversation);


export default router;