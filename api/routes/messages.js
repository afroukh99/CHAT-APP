import express from 'express'
import { createMessage,getMessages,deleteMessages } from '../controllers/messages.controller.js'


const router = express.Router()

router.post('/',createMessage);
router.get('/:convId',getMessages);
router.put('/:convId',deleteMessages);



export default router;