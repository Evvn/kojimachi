import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';
import { serverMessage } from './constants';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // allow app to parse JSON data from requests
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(serverMessage(PORT));
});

export default app;
