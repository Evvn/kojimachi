import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`
  .▄▄ · ▄▄▄ .▄▄▄   ▌ ▐·▄▄▄ .▄▄▄      ▄▄▄  ▄• ▄▌ ▐ ▄  ▐ ▄ ▪   ▐ ▄  ▄▄ • 
▐█ ▀. ▀▄.▀·▀▄ █·▪█·█▌▀▄.▀·▀▄ █·    ▀▄ █·█▪██▌•█▌▐█•█▌▐███ •█▌▐█▐█ ▀ ▪
▄▀▀▀█▄▐▀▀▪▄▐▀▀▄ ▐█▐█•▐▀▀▪▄▐▀▀▄     ▐▀▀▄ █▌▐█▌▐█▐▐▌▐█▐▐▌▐█·▐█▐▐▌▄█ ▀█▄
▐█▄▪▐█▐█▄▄▌▐█•█▌ ███ ▐█▄▄▌▐█•█▌    ▐█•█▌▐█▄█▌██▐█▌██▐█▌▐█▌██▐█▌▐█▄▪▐█
 ▀▀▀▀  ▀▀▀ .▀  ▀. ▀   ▀▀▀ .▀  ▀    .▀  ▀ ▀▀▀ ▀▀ █▪▀▀ █▪▀▀▀▀▀ █▪·▀▀▀▀ 
                  ✩░▒▓▆▅▃▂▁on port ${PORT}▁▂▃▅▆▓▒░✩
  `);
});