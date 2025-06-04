import { useCollectionsContext } from "../contexts/collectionsContext";

function AddToCollectionPopup({ artwork, show, onClose }) {
  const { collections, addArtworkToCollection } = useCollectionsContext();

  if (!show || !artwork) return null;

  return (
    <div className="absolute inset-0 rounded-lg bg-gray-800/20 backdrop-blur-sm flex items-center justify-center z-1">
      <div className="bg-gray-700 p-4 rounded shadow-lg">
        <p className="mb-2 text-lg font-bold">Add to Collection</p>
        {collections.length === 0 ? (
          <p>No collections yet...</p>
        ) : (
          <ul>
            {collections.map((col) => {
              const alreadyInCollection = col.artworks.some(
                (item) =>
                  item.id === artwork.id && item.source === artwork.source
              );
              return (
                <li key={col.name}>
                  <button
                    className={`py-1 px-2 mt-2 w-full max-w-[200px] rounded-md transition-colors duration-200 whitespace-nowrap truncate ${
                      alreadyInCollection
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500/50 text-white hover:bg-blue-400/80"
                    }`}
                    onClick={() => {
                      if (!alreadyInCollection) {
                        addArtworkToCollection(col.name, artwork);
                        onClose();
                      }
                    }}
                    disabled={alreadyInCollection}
                  >
                    {col.name}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button
          className="mt-2 py-1 px-3 bg-gray-500 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddToCollectionPopup;
