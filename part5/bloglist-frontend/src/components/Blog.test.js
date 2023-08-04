import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'



test('renders only title if not pressed', () => {
  const blog = {
    title: 'testing',
    author: 'tester',
    url:'www.testing.net',
    likes: 20,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testing')
  expect(element).toBeDefined()
})

test('clicking view buttons shows all the details of a blog', async () => {
  const blog = {
    title: 'testing',
    author: 'tester',
    url:'www.testing.net',
    likes: 20,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.queryByTestId('details')
  expect(element).toBeDefined()
})

test('clicking like two times calls the function two times', async () => {
  const blog = {
    title: 'testing',
    author: 'tester',
    url:'www.testing.net',
    likes: 20,
  }

  blogService.like = jest.fn().mockResolvedValue({})

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')


  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.like).toHaveBeenCalledTimes(2)
})