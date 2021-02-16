import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { GardenContext } from './../../contexts/ZenGardenContexts';

// const SEARCH_ENDPOINT = 'http://localhost:8000/trees?q=';

function ZenSearch() {
  const [garden, setGarden] = useState(() => {
    return JSON.parse(localStorage.getItem('garden')) || [];
  });

  const [filteredTree, setFilteredTree] = useState(() => [...garden]);
  const [searchTerm, setSearchTerm] = useState('');

  let handleChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Filter
    const filtered = garden.filter((tree) =>
      tree.name.toLowerCase().includes(searchTerm),
    );
    console.log('filtered trees', filtered);
    // I would expect set garden here to render the filtered trees
    console.log('current garden', garden);
    setGarden(filtered);
    console.log('new garden', garden);
  }, [filteredTree, searchTerm, setGarden]);

  return (
    <div>
      <form>
        <label>Search</label>
        <input
          type="text"
          placeholder="search"
          className="search"
          onChange={handleChange}
          value={searchTerm}
        ></input>
      </form>
    </div>
  );
}
export default ZenSearch;
