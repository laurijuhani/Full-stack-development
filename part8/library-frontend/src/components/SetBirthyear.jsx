import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from "react-select"

const SetBirthyear = ({ authors }) => {
  const [selected, setSelected] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })  

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selected.value, setBornTo: parseInt(born) } })

    setSelected(null)
    setBorn('')
  }

  const handleSelect = (option) => {
    setSelected(option)
    setBorn(option.born ? option.born.toString() : '')
  }

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <Select
          value={selected}
          onChange={handleSelect}
          options={authors.map((a) => ({ value: a.name, label: a.name, born: a.born }))}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear