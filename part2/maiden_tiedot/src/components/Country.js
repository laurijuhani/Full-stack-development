const Country = ({ country, setNewFilter }) => {

    return ( 
        <p>
            {country}
            <button onClick={() => setNewFilter(country)}>show</button>
        </p>
    ); 
}; 

export default Country; 