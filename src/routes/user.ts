import express from 'express';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// Attach the auth middleware to all user routes
router.use(AuthController.authenticate);

// routes for /user are defined here
router.post('/', UserController.createUser); // create a new user
router.get('/:id', UserController.retrieveUser); // retrieve an existing user using UUID
router.put('/:id', UserController.updateUser); // update an existing user using UUID
router.delete('/:id', UserController.deleteUser); // delete an existing user using UUID
router.get('/', UserController.getAllUsers); // return a list of all users

export default router;
