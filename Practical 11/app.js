import express from 'express';
import normalizePath from './middlewares/normalizePath.js';

const app = express();
const port = 3000;

app.use(normalizePath);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage');
});

app.get('/user/profile', (req, res) => {
  res.send('User Profile Page');
});

app.get('/*splat', (req, res) => {
  res.send('Fallback page');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
