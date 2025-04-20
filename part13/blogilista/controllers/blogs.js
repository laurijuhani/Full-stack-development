const blogsRouter = require('express').Router()
const { Blog } = require('../models')
const { User } = require('../models')
const { blogFinder } = require('../utils/middleware')
const { Op } = require('sequelize')

blogsRouter.get('/', async (request, response) => {
  const where = {}

  if (request.query.search) {
    where[Op.or] = [
      { title: { [Op.substring]: request.query.search } },
      { author: { [Op.substring]: request.query.search } }
    ];
  }
  
  const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['username', 'name']
        },
        order: [['likes', 'DESC']],
        where
   })
   response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'no token available'})
  }

  const savedBlog = await Blog.create({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes || 0, 
    year: body.year || new Date().getFullYear(),
    userId: user.id
  })
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', blogFinder, async (request, response) => {
  const user = request.user
  if (!user) {
    return response(401).json({ error: 'You need to login in order to delete blogs'})
  }


  
  if (!(request.blog.dataValues.userId === user.id)) {
    return response.status(401).json({ error: 'You do not have the permission to delete this blog' })
  }
  
  await request.blog.destroy()
  response.status(204).end()
})

blogsRouter.put('/:id', blogFinder, async (request, response) => {
  const body = request.body

  if (!body.likes) {
    return response.status(400).json({ error: 'likes missing' })
  }

  request.blog.setDataValue('likes', body.likes)


  await request.blog.save()
  response.json(request.blog.likes)
})


module.exports = blogsRouter
