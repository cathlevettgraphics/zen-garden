import { createContext, useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

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
  const { addToast } = useToasts();

  const GARDEN_ENDPOINT = 'http://localhost:8000/trees/';

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
      setGarden(data);
    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
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
      addToast(`Saved ${savedTree.treeName}`, {
        appearance: 'success',
      });
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message} || ${err.statusText}`, {
        appearance: 'error',
      });
    }
  };

  const updateTree = async (id, updates) => {
    console.log('updating', id, updates);
    let updatedTree = null;
    try {
      const response = await fetch(`${GARDEN_ENDPOINT}${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      // Get index
      const index = garden.findIndex((tree) => tree.id === id);
      console.log('index', index);

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
        updateTree,
        ...garden.slice(index + 1),
      ];

      // Add to local storage
      localStorage.setItem('garden', JSON.stringify(updatedTrees));
      addToast(`Updated ${updatedTree.name}`, {
        appearance: 'success',
      });
      setGarden(updatedTree);
    } catch {}
  };

  // Delete tree
  const deleteTree = async (id) => {
    let deletedTree = null;
    try {
      const response = await fetch(`${GARDEN_ENDPOINT}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw response;
      }
      // Get index
      const index = garden.findIndex((tree) => tree.id === id);
      deletedTree = garden[index];
      // console.log({ deletedTree, index });
      // recreate the garden array without that tree
      const updatedTree = [
        ...garden.slice(0, index),
        ...garden.slice(index + 1),
      ];
      localStorage.setItem('garden', JSON.stringify(updatedTree));
      setGarden(updatedTree);
      addToast(`Deleted ${deletedTree.name}`, {
        appearance: 'success',
      });
    } catch (err) {
      console.log(err);
      addToast(`Error: Failed to update ${deletedTree.treeName}`, {
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
