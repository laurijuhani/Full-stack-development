import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Filter from "./components/Filter";
import Country from "./components/Country";
import Match from "./components/Match";
import axios from "axios";


const App = () => {
  const [countries, setCountries] = useState([]); 
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries); 
      }); 
  }, []);

  const countriesToShow = countries.filter(country => {
    if (newFilter === '') {
      return; 
    }; 
    const filterLowerCase = newFilter.toLowerCase();
    const nameToLowerCase = country.name.common.toLowerCase();

    return nameToLowerCase.includes(filterLowerCase);   
  });


// API request ei toimi 

/*  useEffect(() => {
    if (countriesToShow.length === 1) {
      const capital = countriesToShow[0].capital;
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const url = `https://samples.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}`;
      console.log(proxyUrl+ url); 
      axios
        .get(proxyUrl + url)
        .then(response => {
          console.log(response.data)
          setWeather(response.data)
        });
    }
  }, [countriesToShow]); */ 

  


  return ( 
    <div>
      <Filter 
      newFilter={newFilter} 
      setNewFilter={setNewFilter} 
      />
      {countriesToShow.length === 1 ? (
        <Match 
        key={countriesToShow}
        country={countriesToShow}
        />
      ) : countriesToShow.length <= 10 ? (
        countriesToShow.map(country => (
          <Country
            key={country.name.common}
            country={country.name.common}
            setNewFilter={setNewFilter}
          />
        ))
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  );
}; 

export default App;