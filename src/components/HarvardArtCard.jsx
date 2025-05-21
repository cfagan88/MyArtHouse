import { Link } from "react-router-dom";
import { useState } from "react";
import { useCollectionsContext } from "../contexts/collectionsContext";

function HarvardArtCard({ record }) {
  const [showPopup, setShowPopup] = useState(false);
  const { collections, addArtworkToCollection } = useCollectionsContext();

  return (
    <div className="relative flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[400px] min-w-[200px] mt-4">
      {/* Add to Collection Popup */}
      {showPopup && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-20">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="mb-2 text-lg font-bold">Add to Collection</p>
            {collections.length === 0 ? (
              <p>No collections yet. Create one now!</p>
            ) : (
              <ul>
                {collections.map((col) => (
                  <li key={col.name}>
                    <button
                      className="py-1 px-3 m-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        addArtworkToCollection(col.name, record);
                        setShowPopup(false);
                      }}
                    >
                      {col.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-2 py-1 px-3 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Link to={`/artwork/${record.source.toLowerCase()}/${record.id}`}>
        <div className="flex-grow text-center flex flex-col">
          <p className="text-xl font-bold line-clamp-2">{record.title}</p>
          <p className="mb-4">{record.classification}</p>
          <div className="flex-grow flex items-center justify-center">
            {record.images?.[0]?.baseimageurl ? (
              <img
                className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
                src={record.images[0].baseimageurl}
                alt={`${record.title} by ${
                  record.people?.[0]?.name || "Unidentified Artist"
                }`}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
        <div className="text-center mt-auto">
          <p>{record.people?.[0].name || "Unidentified Artist"}</p>
          <p className="text-sm">{record.dated}</p>
          <p className="text-sm">Harvard Art Museums/Fogg Museum</p>
        </div>
      </Link>
      <div className="flex justify-center mt-4">
        <button
          className="py-2 w-full max-w-[200px] bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          title="Add to Collection"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPopup(true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default HarvardArtCard;
