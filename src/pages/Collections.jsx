import { useState } from "react";
import { useCollectionsContext } from "../contexts/collectionsContext";
import { Link } from "react-router-dom";

function Collections() {
  const { collections, addCollection, deleteCollection, contextError } =
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
        className="max-w-125 mb-3 flex gap-2 px-6 box-border"
        onSubmit={handleAddCollection}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 min-w-40 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Collection name..."
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
        />
        <button
          className="py-3 px-2 bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          type="submit"
        >
          Add Collection
        </button>
      </form>

      {contextError && (
        <div className="justify-center px-10">
          <div className="text-m text-red-500">{contextError}</div>
        </div>
      )}
      <div className="grid mx-auto px-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {collections.map((collection, idx) => (
          <div
            key={idx}
            className=" bg-gray-800 p-4 rounded-lg min-w-[250px] max-w-90 w-full mt-8 flex flex-col items-center relative"
          >
            <Link to={`/collections/${collection.name}`} key={collection.name}>
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
              <div className="grid grid-cols-2 grid-rows-2 gap-2 my-6 w-80 h-80">
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
                        className="w-full h-full object-cover rounded border border-gray-700"
                      />
                    ) : null;
                  })}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collections;
