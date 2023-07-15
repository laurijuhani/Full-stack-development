const Filter = ({ newFilter, setNewFilter }) => {

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value); 
    }; 

    return(
        <form>
            <div>find countries <input value={newFilter} onChange={handleFilterChange} /></div>
        </form>
    );
};

export default Filter;