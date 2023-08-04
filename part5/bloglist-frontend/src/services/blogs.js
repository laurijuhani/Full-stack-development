import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newBlog => {
  const config = {
    headers: { authorization: token },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const like = blog => {
  const updatedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const request = axios.put(`${baseUrl}/${blog.id}`, updatedBlog)
  return request.then(response => response.data)
}

const deleteBlog = blog => {
  const config = {
    headers: { authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  setToken,
  removeToken,
  create,
  like,
  deleteBlog
}