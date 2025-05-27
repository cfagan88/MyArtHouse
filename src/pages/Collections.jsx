import { useState } from "react";
import { useCollectionsContext } from "../contexts/collectionsContext";

function Collections() {
  const { collections, addCollection, deleteCollection } =
    useCollectionsContext();
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleAddCollection = (e) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      addCollection(newCollectionName.trim());
      setNewCollectionName("");
    }
  };

  return (
    <div className="w-screen py-20 min-h-screen">
      <form
        className="max-w-2xl mx-auto mb-3 flex gap-4 px-4 box-border"
        onSubmit={handleAddCollection}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="New collection name..."
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
        <button
          className="py-3 px-6 bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          type="submit"
        >
          Add New Collection
        </button>
      </form>

      <div className="grid mx-auto px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {collections.map((collection, idx) => (
          <div
            key={idx}
            className=" bg-gray-800 p-4 rounded-lg min-w-[250px] max-w-xs w-full mx-auto mt-8 flex flex-col items-center relative"
          >
            <h3 className="text-lg text-white font-bold mb-2 truncate max-w-full">
              {collection.name}
            </h3>
            <button
              className="absolute top-1 right-3 text-gray-400 hover:text-red-600 cursor-pointer text-3xl font-bold"
              title="Delete collection"
              onClick={() => deleteCollection(collection.name)}
            >
              &times;
            </button>
            <p className="text-white">
              {collection.artworks?.length || 0} artworks
            </p>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 my-4 w-60 h-60">
              {collection.artworks &&
                collection.artworks.slice(0, 4).map((artwork, idx) => {
                  const imageUrl =
                    artwork.image ||
                    artwork.primaryimageurl ||
                    (artwork.images &&
                      artwork.images.web &&
                      artwork.images.web.url);

                  return imageUrl ? (
                    <img
                      key={idx}
                      src={imageUrl}
                      alt={artwork.title || "Artwork thumbnail"}
                      className="w-30 h-30 object-cover rounded border border-gray-700"
                    />
                  ) : null;
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
