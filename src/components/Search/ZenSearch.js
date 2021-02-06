import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { GardenContext } from './../../contexts/ZenGardenContexts';

function ZenSearch({ handleOnSubmit, searchTerm, handleOnChange }) {
  // const SEARCH_ENDPOINT = 'http://localhost:8000/trees?q=';

  // const [searchTerm, setSearchTerm] = useState('');
  // const [garden2, setGarden2] = useState([]);

  // const { searchGarden } = useContext(GardenContext);

  // function handleOnSubmit(e) {
  //   e.preventDefault();
  // }

  // function handleOnChange(e) {
  //   setSearchTerm(e.target.value);
  //   console.log(e.target.value);

  // fetch(SEARCH_ENDPOINT + searchTerm)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log('the filtered garden based on search is:', data);
  //     setGarden2(data);
  //   });
  // setSearchTerm('');

  //   useEffect(() => {
  //     fetchGarden();
  //   }, [fetchGarden]);
  // }

  // Use context
  const { searchGarden } = useContext(GardenContext);

  // Call searchGarden
  useEffect(() => {
    searchGarden();
  }, [searchGarden]);

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <label>Search</label>
        <input
          type="text"
          placeholder="search"
          className="search"
          value={searchTerm}
          onChange={handleOnChange}
        ></input>
      </form>
    </div>
  );
}

export default ZenSearch;
