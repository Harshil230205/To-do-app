//import 
import express from 'express';
import { todoController } from '../controllers/testControllers.js';


//router object
const router = express.Router();

//routes
router.get('/todo',todoController);

//exports
export default router;