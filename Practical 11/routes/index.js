const express = require('express');
const router = express.Router();

router.get('/user/profile', (req, res) => {
  res.send('User Profile Page');
});

router.get('*', (req, res) => {
  res.send('Fallback page');
});

module.exports = router;
