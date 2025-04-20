const logoutRouter = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')

logoutRouter.delete('/', async (request, response) => {
  const token = request.token
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'no token available'})
  }
  await Session.destroy({
    where: {
      sessionToken: token
    }
  })
  response.status(204).end()
})

module.exports = logoutRouter