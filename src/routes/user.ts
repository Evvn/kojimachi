import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// routes for User are defined here
router.post('/', UserController.createUser); // create a new user
router.get('/:id', UserController.retrieveUser); // retrieve an existing user using UUID
router.put('/:id', UserController.updateUser); // update an existing user using UUID
router.delete('/:id', UserController.deleteUser); // delete an existing user using UUID
router.get('/', UserController.getAllUsers); // return a list of all users

export default router;
