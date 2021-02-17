import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './ZenList.module.css';
import { GardenContext } from './../../contexts/ZenGardenContexts';
import ZenSearch from '../Search/ZenSearch';
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

  // // Use context
  const { fetchGarden, deleteTree, loading, error, garden } = useContext(
    GardenContext,
  );

  // // Call fetchGarden
  useEffect(() => {
    fetchGarden();
  }, [fetchGarden]);

  return (
    <section>
      <div className={styles.gardenContainer}>
        <div className={styles.sectionHeader}>
          {loading && <p>loading ...</p>}
          {error && <p>error.message</p>}
          <h1 className={styles.secondaryHeader}>All your zen in one place</h1>
          <p className={styles.secondaryStrap}>
            Add, update and delete your garden
          </p>
          <ZenSearch />
        </div>
        {garden.length ? (
          <ul className={styles.gardenList}>
            {garden.map(({ id, tree, name, leaves, minTemp, imageUrl }) => (
              <li key={id} id={id} className={styles.treeItem}>
                <h3 className={styles.treeName}>{name}</h3>
                <p className={styles.treeNameLatin}>{tree}</p>
                <img
                  src={imageUrl}
                  alt={name}
                  className={styles.gardenImage}
                ></img>
                <p className={styles.treeLeaves}>{leaves}</p>
                <p>Hardy to {minTemp}C</p>
                <Link to={`/zen/tweakzen/${id}`} className={styles.updateZen}>
                  update zen
                </Link>
                <button
                  onClick={() => deleteTree(id)}
                  className={styles.deleteZen}
                >
                  delete zen
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Create your chilled zen garden!</p>
        )}
      </div>
    </section>
  );
}

export default ZenList;
