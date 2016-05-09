import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Log in status
router.route('/loginStatus').get(UserController.loginStatus);

// Log in user
router.route('/loginUser').post(UserController.loginUser);

// log out user
router.route('/logoutUser').get(UserController.logoutUser);

// register user
router.route('/registerUser').post(UserController.registerUser);

export default router;
