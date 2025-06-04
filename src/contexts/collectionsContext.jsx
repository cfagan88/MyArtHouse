import { createContext, useContext, useState } from "react";

const CollectionsContext = createContext();

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([
    { name: "Favourites", artworks: [] },
  ]);
  const [contextError, setContextError] = useState(null);

  const addCollection = (name) => {
    setCollections((prev) => {
      if (prev.some((col) => col.name.trim() === name.trim())) {
        setContextError(`"${name}" already exists`);
        return prev;
      }
      setContextError(null);
      return [...prev, { name, artworks: [] }];
    });
  };

  const addArtworkToCollection = (collectionName, artwork) => {
    setCollections((prev) =>
      prev.map((col) => {
        if (col.name === collectionName) {
          const exists = col.artworks.some(
            (art) => art.id === artwork.id && art.source === artwork.source
          );
          if (exists) {
            setContextError(`Artwork already added to "${collectionName}"`);
            return col;
          }
          setContextError(null);
          return {
            ...col,
            artworks: [...col.artworks, artwork],
          };
        }
        return col;
      })
    );
  };

  const deleteCollection = (name) => {
    setCollections((prev) => prev.filter((col) => col.name !== name));
  };

  const clearContextError = () => setContextError(null);

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        addCollection,
        addArtworkToCollection,
        deleteCollection,
        contextError,
        clearContextError,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
