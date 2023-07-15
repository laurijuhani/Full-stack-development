import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])  
 
  const personsToShow = persons.filter(person => {
    const filterLowerCase = newFilter.toLowerCase()
    const nameLowerCase = person.name.toLowerCase()

    return nameLowerCase.includes(filterLowerCase)
  })

    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} /> 
      <h2>add a new</h2>
      <PersonForm 
        persons={persons} 
        setPersons={setPersons}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage} 
        />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
         <Person 
          key={person.name}  
          person={person} 
          setPersons={setPersons} 
          setMessage={setMessage}
          /> 
        )}
      </div>
    </div>
  )
}

export default App