const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await User.insertMany(helper.initialUser)
})

test('blogs are returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach((blog) => {
        expect(blog.id).toBeDefined()
    })
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: "Rober C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 17
    }

    await api
        .post('/api/blogs')
        .set('authorization', `Bearer ${helper.token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('modifying existing blog', () => {
    test('succeeds with valid data', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes += 5

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes + 5)
    })

    
    test('if likes are undefined they dont change', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.likes = null

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes)
    })
})


describe('when there is initially one user at db', () => {
   
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'hellas',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'unique',
            name: 'new',
            password: 'no'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  describe('logging in', () => {

    test('logging in with existing user works', async () => {

        const user = {
            username: 'hellas',
            password: 'admin'
        }
    
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        helper.token = response.body.token
        
    })
    
    test('logging in with wrong password should return correct statuscode', async () => {
        const user = {
            username: 'hellas',
            password: 'wrong'
        }

        const response = await api 
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type', /application\/json/)

            expect(response.body.error).toContain('invalid username or password')
    })

  })

  describe('adding and deleting blogs', () => {

    test('adding blog using POST works with valid token', async () => {
        const blog = {
            title: "test",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 13
        }
    
    
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${helper.token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain('test')
    })

    test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('authorization', `Bearer ${helper.token}`)
            .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const title = blogsAtEnd.map(t => t.title)

            expect(title).not.toContain(blogToDelete.title)
    })

    test('adding blog without likes returns 0 likes', async () => {
        const blog = {
            title: "no likes",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
    
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${helper.token}`)
            .send(blog)
            .expect(201)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    
    })

    test('adding blog without url returns correct statuscode', async () => {
        const blog = {
            title: "no url",
            author: "Robert C. Martin",
            likes: 13,
        }
    
        await api
            .post('/api/blogs')
            .set('authorization', `Bearer ${helper.token}`)
            .send(blog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('deleting blog with wrong user returns correct statuscode', async () => {
        const wrongUser = {
            username: 'anna',
            password: 'salainen'
        }

        const response = await api
            .post('/api/login')
            .send(wrongUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        helper.token = response.body.token

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('authorization', `Bearer ${helper.token}`)
            .expect(401)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length
            )

            const title = blogsAtEnd.map(t => t.title)

            expect(title).toContain(blogToDelete.title)
    })
  })
  

afterAll(async () => {
    await mongoose.connection.close()
  })