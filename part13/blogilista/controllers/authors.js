const authorRouter = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../utils/db')

authorRouter.get('/', async (request, response) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'], 
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'] 
    ],
    group: ['author'], 
    order: [['likes', 'DESC']] 
  });

  response.json(authors);
});





module.exports = authorRouter