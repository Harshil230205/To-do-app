//import 
import express from 'express';
import { register,login } from '../controllers/userController.js';


//router object
const routes = express.Router();

//routes
routes.post('/register', register);
routes.post('/login', login);




//exports
export default routes;