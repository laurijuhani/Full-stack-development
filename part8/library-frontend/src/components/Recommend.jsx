import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import { useState } from "react"

const Recommend = ({ show }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: null }
  })
  const user = useQuery(ME)


  if (!show) {
    return null
  }

  if (result.loading || user.loading) {
    return <div>loading...</div>
  }

  result.refetch({ genre: user.data.me.favoriteGenre })

  const books = result.data.allBooks
  const favoriteGenre = user.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>      

      <p>books in your favorite genre <b>{favoriteGenre}</b></p>

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
    </div>
  )
}

export default Recommend
