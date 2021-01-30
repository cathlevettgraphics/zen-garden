import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './ZenList.module.css';
import { GardenContext } from '../../contexts/ZenGardenContexts';

// const GARDEN_ENDPOINT = 'http://localhost:8000/trees';

function ZenList() {
  // const [garden, setGarden] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getGarden() {
  //     setLoading(true);
  //     const response = await fetch(GARDEN_ENDPOINT);
  //     const data = await response.json();
  //     console.log('garden data', data);
  //     setGarden(data);
  //     setLoading(false);
  //     setLoaded(true);
  //   }
  //   if (!loaded && !loading) {
  //     getGarden();
  //   }
  //   return () => {};
  // }, [garden, setGarden, setLoaded, setLoading]);

  // Use context
  const {
    garden,
    loading,
    error,
    fetchGarden,
    addTree,
    updateTree,
    deleteTree,
  } = useContext(GardenContext);

  // Call fetchGarden
  useEffect(() => {
    fetchGarden();
  }, [fetchGarden]);

  return (
    <section>
      <div className={styles.gardenContainer}>
        {loading && <p>loading ...</p>}
        {error && <p>error.message</p>}

        <div className={styles.sectionHeader}>
          <h1 className={styles.secondaryHeader}>All your zen in one place</h1>
          <p className={styles.secondaryStrap}>
            Add, update and delete your zen here
          </p>
        </div>
        {garden.length ? (
          <ul className={styles.gardenList}>
            {garden.map(
              ({ id, tree, treeName, leaves, height, minTemp, imageUrl }) => (
                <li key={id}>
                  <h3 className={styles.treeName}>{treeName}</h3>
                  <p className={styles.treeNameLatin}>{tree}</p>
                  <img
                    src={imageUrl}
                    alt={treeName}
                    width="200"
                    className={styles.gardenImage}
                  ></img>
                  <p className={styles.treeLeaves}>{leaves} leaves</p>
                  <p>Hardy to {minTemp}C</p>
                  <Link
                    to={`/zen/tweak-zen/${id}`}
                    className={styles.updateZen}
                  >
                    update zen
                  </Link>
                  <button className={styles.deleteZen}>delete zen</button>
                </li>
              ),
            )}
          </ul>
        ) : (
          <p>Create your chilled zen garden!</p>
        )}
      </div>
    </section>
  );
}

export default ZenList;
