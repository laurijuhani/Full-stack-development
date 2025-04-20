const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { User } = require('../models')
const { Blog } = require('../models')

usersRouter.get('/', async (request, response) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['passwordHash']
        },
        include: {
            model: Blog,
            attributes: {
                exclude: ['userId']
            },
        },
    })
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const where = {}

    if (request.query.read) {
        if (request.query.read === 'true') {
            where.read = true
        }
        if (request.query.read === 'false') {
            where.read = false
        }
    }

    const user = await User.findOne({
        where: { id: request.params.id },
        attributes: {
            exclude: ['passwordHash', 'createdAt', 'updatedAt', 'id']
        },
        include: {
            model: Blog,
            as: 'readingList',
            attributes: {
                exclude: ['userId', 'createdAt', 'updatedAt']
            },
            through: {
                attributes: ['id', 'read'],
                where,
            }
        },
    })

    if (!user) {
        return response.status(404).json({
            error: 'user not found'
        })
    }
    response.json(user)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    
    /*
    if (password.length < 3 ) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })
    }
    */

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ 
        username,
        name, 
        passwordHash,
    })

    response.status(201).json(user)
})


usersRouter.put('/:username', async (request, response) => {
    const { username } = request.params
    const { name } = request.body

    const user = await User.findOne({ where: { username } })

    if (!user) {
        return response.status(404).json({
            error: 'user not found'
        })
    }
 
    user.name = name || user.name

    await user.save()

    response.status(200).json(user)
})

module.exports = usersRouter
