import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('calls createBlog with correct credentials', async () => {
  const mockHandler = jest.fn()

  render(<BlogForm createBlog={mockHandler} />)

  const inputs = screen.getAllByRole('textbox')
  const button = screen.getByText('create')

  const user = userEvent.setup()

  await user.type(inputs[0], 'Test Blog')
  await user.type(inputs[1], 'Test author')
  await user.type(inputs[2], 'www.test.com')

  await user.click(button)

  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test author',
    url: 'www.test.com'
  })
})