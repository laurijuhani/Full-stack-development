const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const blogs = helper.initialBlogs


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    test('of empty list is zero', () => {
      expect(listHelper.totalLikes([])).toBe(0)
    })
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
  })

  describe('most likes', () => {
    test('returns correct blog', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(blogs[2])
    })

    test('by author', () => {
      const result = listHelper.mostLikes(blogs)
      const answer = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
      expect(result).toEqual(answer)
    })
  })

  describe('most blogs', () => {
    test('returns correct author', () => {
      const result = listHelper.mostBlogs(blogs)
      const answer = {
        author: "Robert C. Martin",
        blogs: 3
      }
      expect(result).toEqual(answer)
    })
  })