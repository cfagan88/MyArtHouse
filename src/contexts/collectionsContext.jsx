import { createContext, useContext, useState } from "react";

const CollectionsContext = createContext();

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([
    { name: "Favourites", artworks: [] },
  ]);
  const [error, setError] = useState(null);

  const addCollection = (name) => {
     if (collections.some((col) => col.name.trim() === name.trim())) {
      setError(`"${name}" already exists`);
      return;
    }
    setCollections((prev) => [...prev, { name, artworks: [] }]);
    setError(null);
  };

  const addArtworkToCollection = (collectionName, artwork) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.name === collectionName
          ? {
              ...col,
              artworks: col.artworks.some(
                (art) => art.id === artwork.id && art.source === artwork.source
              )
                ? col.artworks
                : [...col.artworks, artwork],
            }
          : col
      )
    );
  };

  const deleteCollection = (name) => {
    setCollections((prev) => prev.filter((col) => col.name !== name));
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addCollection,
        addArtworkToCollection,
        deleteCollection,
        error,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
