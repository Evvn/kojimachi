import { Request, Response } from 'express';
import pool from '../dbConfig';
import { userSchema } from '../schemas/user';
import { v4 as uuidv4 } from 'uuid'; // Import UUID v4 generator

const UserController = {
  // Retrieve all users from the database
  // Send the users as a response
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const query = 'SELECT * FROM users';
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Create a new user
  createUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const userId = uuidv4(); // Generate a UUID, acts as PK in DB

    try {
      await userSchema.validateAsync({ name, email, password }); // Validate request data
      const query =
        'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
      const result = await pool.query(query, [userId, name, email, password]);
      res.status(201).json({ id: result.rows[0].id, name, email });
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // Retrieve a specific user
  retrieveUser: async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update an existing user
  updateUser: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const { name } = req.body;

    try {
      const query =
        'UPDATE users SET name = $1 WHERE id = $2 RETURNING id, name, email';
      const result = await pool.query(query, [name, userId]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete an existing user
  deleteUser: async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await pool.query(query, [userId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default UserController;
