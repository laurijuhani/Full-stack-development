const Match = ({ country }) =>  {

    return (
        <div>
            {country.map(c => (
                <div key={c.name.common}>
                <h1>{c.name.common}</h1>
                <p>capital {c.capital}</p>
                <p>area {c.area}</p>
    
                <b>languages:</b>
                <ul>
                    {Object.values(c.languages).map((language, index) => (
                    <li key={index}>{language}</li> 
                    ))}
                </ul>
                <img src={c.flags.png} alt={c.flags.alt} height={170} width="auto" />
                </div>
            ))}
        </div>
    ); 
}; 

export default Match; 