import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// routes for User are defined here
router.get('/', UserController.getAllUsers); // return a list of all users

// Add other routes for create, update, delete, etc.

export default router;
