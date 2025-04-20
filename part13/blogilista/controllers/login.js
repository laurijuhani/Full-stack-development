const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const Session = require('../models/session')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ where: { username } })

    const passwordCorrect = user === null
        ? false 
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id 
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    await Session.create({
        userId: user.id,
        sessionToken: token
    })

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter