import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
                title:
        <input id="title" type="text" value={title} name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input id='author' type="text" value={author} name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input id='url' type="text" value={url} name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='submit' type="submit">create</button>
    </form>
  )

  return(
    <>
      <h2>create new</h2>

      {blogForm()}
    </>
  )
}

export default BlogForm