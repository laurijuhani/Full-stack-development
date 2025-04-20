const express = require('express');
const router = express.Router();
const redis = require('../redis')

router.get('/', async (req, res) => {
  const count = await redis.getAsync("added_todos")
  if (!count) {
    return res.send({ added_todos: 0 })
  }
  res.send({ added_todos: parseInt(count) })
});

module.exports = router;