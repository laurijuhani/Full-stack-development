import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState, useEffect } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: { genre }
  })

  useEffect(() => {
    if (result.data) {
      
      const books = result.data.allBooks
      const fetchedGenres = books.reduce((acc, book) => {
        book.genres.forEach((genre) => {
          if (!acc.includes(genre)) {
            acc.push(genre)
          }
        })
        return acc
      }, [])

      setGenres((prevGenres) => {
        const newGenres = fetchedGenres.filter((genre) => !prevGenres.includes(genre))
        return [...prevGenres, ...newGenres]
      })
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  


  const handleGenreClick = (genre) => {
    setGenre(genre)
    result.refetch({ genre })
  }



  return (
    <div>
      <h2>books</h2>

      {genre && <p>in genre <b>{genre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>{genre}</button>
        ))}
        <button onClick={() => handleGenreClick(null)}>all genres</button>
      </div>

    </div>
  )
}

export default Books
