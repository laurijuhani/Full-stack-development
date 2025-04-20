import { ALL_AUTHORS } from "../queries"
import { useQuery } from "@apollo/client"
import SetBirthyear from "./SetBirthyear"
import PropTypes from "prop-types"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetBirthyear authors={authors} />
    </div>
  )
}
Authors.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Authors
