import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../JWTconfig';

const AuthController = {
  generateJWT: (userId: string) => {
    return jwt.sign({ id: userId }, jwtSecret); // TODO: Update with secure JWT secret
  },

  // JWT middleware that authenticates each protected route & request
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    });
  },

  // /login route which authenticates using JWT and attaches token to Authorization header
  login: (req, res) => {
    // When extending on this API service, we can provide a more comprehensive auth feature here
    // For simplicity of this demo, assume the user is authenticated and generate the JWT directly
    // as soon as the /login route is visited
    const userId = 'demoUserId'; // TODO: replace with more fully featured user auth
    const jwtToken = AuthController.generateJWT(userId);

    res
      .header('Authorization', jwtToken)
      .status(200)
      .json({ message: 'JWT token attached', token: jwtToken });
  },
};

export default AuthController;
