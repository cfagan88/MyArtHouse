import { Link } from "react-router-dom";
import { useState } from "react";
import { useCollectionsContext } from "../contexts/collectionsContext";
import AddToCollectionPopup from "./AddToCollectionPopup";

function CMAArtCard({ record, deleteSingleArtwork }) {
  const [showPopup, setShowPopup] = useState(false);
  const { collections, addArtworkToCollection } = useCollectionsContext();

  return (
    <div className="relative flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[500px] min-w-[200px] mt-2">
      <AddToCollectionPopup
        artwork={record}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <Link to={`/artwork/${record.source.toLowerCase()}/${record.id}`}>
        <div className="flex-grow text-center flex flex-col">
          <p className="text-xl font-bold line-clamp-2">{record.title}</p>
          {deleteSingleArtwork && (
            <button
              className="absolute top-1 right-3 text-gray-400 hover:text-red-600 cursor-pointer text-3xl font-bold"
              title="Delete collection"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteSingleArtwork();
              }}
            >
              &times;
            </button>
          )}
          <p className="mb-4">{record.department}</p>
          <div className="flex-grow flex items-center justify-center">
            {record.images?.web?.url ? (
              <img
                className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
                src={record.images.web.url}
                alt={`${record.title} by ${
                  record.creators[0]?.description || "Unidentified Artist"
                }`}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
      </Link>
      <div className="text-center mt-auto">
        <p>{record.creators[0]?.description || "Unidentified Artist"}</p>
        <p className="text-sm">{record.creation_date}</p>
        <p className="text-sm">Cleveland Museum of Art</p>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="py-2 w-full max-w-[200px] bg-blue-500/50 text-white rounded-md transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          title="Add to Collection"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPopup(true);
          }}
        >
          Add to collection
        </button>
      </div>
    </div>
  );
}

export default CMAArtCard;
