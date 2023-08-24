import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// routes for /login are defined here
router.post('/', AuthController.login); // authenticate with JWT

export default router;
