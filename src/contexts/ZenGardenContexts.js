import { createContext, useState } from 'react';
// import { useToasts } from 'react-toast-notifications';

// Create context
export const GardenContext = createContext({
  fetchGarden: () => [],
  addTree: () => {},
  updateTree: () => {},
  deleteTree: () => {},
  loaded: false,
  loading: false,
  error: null,
  garden: [],
});

export const GardenProvider = (props) => {
  const [garden, setGarden] = useState(() => {
    return JSON.parse(localStorage.getItem('garden')) || [];
  });

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  // const { addToast } = useToasts();

  const GARDEN_ENDPOINT = 'http://localhost:8000/trees';

  const fetchGarden = async () => {
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(GARDEN_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      } else {
        setLoading(true);
      }
      const data = await response.json();
      localStorage.setItem('garden', JSON.stringify(data));
      setGarden(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const addTree = () => {};
  const updateTree = () => {};
  const deleteTree = () => {};

  return (
    <GardenContext.Provider
      value={{
        garden,
        loading,
        error,
        fetchGarden,
        addTree,
        updateTree,
        deleteTree,
      }}
    >
      {props.children}
    </GardenContext.Provider>
  );
};
