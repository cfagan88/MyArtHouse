import { createContext, useContext, useState } from "react";

const CollectionsContext = createContext();

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState([
    { name: "Favourites", artworks: [] },
  ]);

  const addCollection = (name) => {
    setCollections((prev) => [...prev, { name, artworks: [] }]);
  };

  const addArtworkToCollection = (collectionName, artwork) => {
    setCollections((prev) =>
      prev.map((col) =>
        col.name === collectionName
          ? { ...col, artworks: [...col.artworks, artwork] }
          : col
      )
    );
  };

  return (
    <CollectionsContext.Provider
      value={{ collections, addCollection, addArtworkToCollection }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
