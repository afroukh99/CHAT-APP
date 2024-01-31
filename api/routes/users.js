import express from 'express'
import { getUser, getUsers } from '../controllers/users.controller.js'


const router = express.Router()

router.get('/',getUsers);
router.get('/single/:id',getUser);




export default router;