import personService from '../services/persons'

const Person = ({ person, setPersons, setMessage }) => {

    const handleNameDelete = () => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deletePerson(person.id)
            personService
            .getAll()
            .then(initialPersons => {
                initialPersons = initialPersons.filter(obj => obj.id !== person.id)
                setPersons(initialPersons)
                setMessage(`Deleted ${person.name}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
        }
    }

    return(
        <p>
            {person.name} {person.number}
            <button 
                onClick={handleNameDelete}>delete
            </button>
        </p>
    )
}

export default Person