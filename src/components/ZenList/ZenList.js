import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GARDEN_ENDPOINT = 'http://localhost:8000/trees';

function ZenList() {
  const [garden, setGarden] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getGarden() {
      setLoading(true);
      const response = await fetch(GARDEN_ENDPOINT);
      const data = await response.json();
      console.log(data);
      setGarden(data);
      setLoading(false);
      setLoaded(true);
    }
    if (!loaded && !loading) {
      getGarden();
    }
    return () => {};
  }, [garden, setGarden, setLoaded, setLoading]);

  return (
    <section>
      <div className="gardenContainer">
        {loading && <p>loading ...</p>}
        {error && <p>error.message</p>}

        <h1>All your zen in one place</h1>
        <p>Add, update and delete your zen here</p>
        {garden.length ? (
          <ul>
            {garden.map(
              ({ id, tree, treeName, leaves, height, minTemp, imageUrl }) => (
                <li key={id}>
                  <h3>{treeName}</h3>
                  <p>{tree}</p>
                  <img src={imageUrl} alt={treeName} width="200"></img>
                  <p>{leaves} leaves</p>
                  <p>
                    Hardy to {minTemp}C and can reach up to {height} meters tall
                  </p>
                  <Link to={`/zen/tweak-zen/${id}`} className="updateZen">
                    update your zen
                  </Link>
                  <button className="deleteZen">delete your zen</button>
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
