import { useState } from "react"
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setMessage, setErrorMessage }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const addName = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    number: newNumber,
  }

  const person = alreadyAdded(newName)
  if (person !== undefined) {
    if (window.confirm(`${newName} is already added to phonebook, replace
    the old number with a new one?`)) {
      const nameObject = {
        name: newName, 
        number: newNumber
      }

      personService
        .update(person.id, nameObject)
        .then(returnedName => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedName))
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${nameObject.name}'s number`)
          setTimeout(() => {
          setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${nameObject.name} has 
          already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
      return
    } else return
  }

  personService
    .create(nameObject)
    .then(returnedName => {
      setPersons(persons.concat(returnedName))
      setNewName('')
       setNewNumber('')
    })
    .finally(message => {
      setMessage(`Added ${nameObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
}

const alreadyAdded = (name) => {
    const person = persons.find(person => person.name === name)
    return person 
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  return(
    <form onSubmit={addName}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm
