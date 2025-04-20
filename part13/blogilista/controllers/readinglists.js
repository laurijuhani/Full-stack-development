const readinglistRouter = require('express').Router()
const { ReadingList } = require('../models')


readinglistRouter.post('/', async (request, response) => {
  const { userId, blogId } = request.body

  const readinglist = await ReadingList.create({ userId, blogId})

  response.status(201).json(readinglist)
})


readinglistRouter.put('/:id', async (request, response) => {
  const { read } = request.body
  const { id } = request.params

  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'no token available'})
  }


  const readinglist = await ReadingList.findByPk(id)

  if (!readinglist) {
    return response.status(404).json({
      error: 'readinglist not found'
    })
  }

  if (readinglist.userId !== user.id) {
    return response.status(401).json({ error: 'You do not have the permission to update this readinglist' })
  }

  readinglist.read = read
  await readinglist.save()

  response.json(readinglist)
})


module.exports = readinglistRouter