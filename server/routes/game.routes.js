import { Router } from 'express';
import * as GameController from '../controllers/game.controller';
const router = new Router();

// Create game as host
router.route('/create').post(GameController.create);

// End game as host
router.route('/end').post(GameController.end);

// Join game as user
router.route('/join').post(GameController.join);

// Leave game as user
router.route('/leave').post(GameController.leave);

// save current stuff as user
router.route('/save').post(GameController.save);

// finish game as user
router.route('/finish').post(GameController.finish);

export default router;
