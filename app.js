import express from 'express';
import dotenv from 'dotenv/config';
import characterRouter from './routes/characters.route.js';
import itemRouter from './routes/items.route.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/character', [characterRouter]);
app.use('/item', [itemRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});