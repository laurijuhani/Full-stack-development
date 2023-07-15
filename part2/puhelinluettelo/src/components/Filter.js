
const Filter = ({ newFilter, setNewFilter }) => {
    
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    return(
        <form>
            <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
        </form>
    )
}

export default Filter