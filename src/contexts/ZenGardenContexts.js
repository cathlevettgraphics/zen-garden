import { createContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

// This array used for filtering
let trees = [];

// Create context
export const GardenContext = createContext({
  fetchGarden: () => [],
  addTree: () => {},
  updateTree: () => {},
  deleteTree: () => {},
  filterTrees: () => {},
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
  const { addToast } = useToasts();

  const GARDEN_ENDPOINT =
    'https://server-zen-garden-api.herokuapp.com/api/v1/trees/';

  const searchGarden = async () => {};

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
      }
      const data = await response.json();
      localStorage.setItem('garden', JSON.stringify(data));
      trees = data;
      setGarden(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const filterTrees = (term = '') => {
    if (term) {
      console.log(`filtering for ${term}`);
      const filtered = trees.filter((tree) =>
        tree.name.toLowerCase().includes(term),
      );
      console.log('trees', trees);
      console.log('filtered', filtered);
      setGarden(filtered);
    }
  };

  const addTree = async (formData) => {
    console.log('adding', formData);
    try {
      const response = await fetch(GARDEN_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }

      // Add tree to array
      const savedTree = await response.json();
      console.log('got data', savedTree);
      const newTrees = [...garden, savedTree];
      localStorage.setItem('garden', JSON.stringify(newTrees));
      setGarden(newTrees);
      addToast(`Saved ${savedTree.name}`, {
        appearance: 'success',
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message} || ${err.statusText}`, {
        appearance: 'error',
      });
    }
  };

  const updateTree = async (_id, updates) => {
    console.log('updating', _id, updates);
    let updatedTree = null;
    try {
      const response = await fetch(`${GARDEN_ENDPOINT}${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      // Changed database id to string as that is what useParam uses
      const index = garden.findIndex((tree) => tree._id === _id);

      // Get the tree
      const oldTree = garden[index];
      console.log('old tree', oldTree);

      // Merge new tree into the data
      updatedTree = {
        ...oldTree,
        ...updates,
      };
      console.log('updated tree', updatedTree);

      // Recreate the garden array
      const updatedTrees = [
        ...garden.slice(0, index),
        updatedTree,
        ...garden.slice(index + 1),
      ];

      // Add to local storage
      localStorage.setItem('garden', JSON.stringify(updatedTrees));
      addToast(`Updated ${updatedTree.name}`, {
        appearance: 'success',
      });
      setGarden(updatedTrees);
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update zen ${updatedTree.name}`, {
        appearance: 'error',
      });
    }
  };

  // Delete tree
  const deleteTree = async (_id) => {
    let deletedTree = null;
    try {
      const response = await fetch(`${GARDEN_ENDPOINT}${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      // Get index
      const index = garden.findIndex((tree) => tree._id === _id);
      // console.log('idx:', index);
      deletedTree = garden[index];
      // console.log('DEL', deletedTree, index);
      // recreate the garden array without that tree
      const updatedTrees = [
        ...garden.slice(0, index),
        ...garden.slice(index + 1),
      ];
      localStorage.setItem('garden', JSON.stringify(updatedTrees));
      setGarden(updatedTrees);
      addToast(`Deleted ${deletedTree.name}`, {
        appearance: 'success',
      });
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${deletedTree.name}`, {
        appearance: 'error',
      });
    }
  };

  return (
    <GardenContext.Provider
      value={{
        garden,
        loading,
        error,
        filterTrees,
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
