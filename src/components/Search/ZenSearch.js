import React from 'react';
import { useState, useContext } from 'react';
import { GardenContext } from './../../contexts/ZenGardenContexts';
import styles from './ZenSearch.module.css';

function ZenSearch() {
  const { filterTrees } = useContext(GardenContext);

  const [searchTerm, setSearchTerm] = useState('');

  let handleChange = (e) => {
    const term = e.target.value.toLowerCase();
    console.log(term);
    setSearchTerm(term);
    filterTrees(term);
  };

  return (
    <div className="filterContainer">
      <form className={styles.filterBox}>
        <label htmlFor="searchTerm" className={styles.filterText}>
          Check out one type of tree ...
        </label>
        <input
          className={styles.filterInput}
          type="text"
          placeholder="tree name"
          onChange={handleChange}
          value={searchTerm}
        ></input>
      </form>
    </div>
  );
}
export default ZenSearch;
