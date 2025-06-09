import { Link } from "react-router-dom";
import { useState } from "react";
import AddToCollectionPopup from "./AddToCollectionPopup";

function HarvardArtCard({ record, deleteSingleArtwork }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative flex flex-col bg-gray-800 p-4 rounded-lg h-full min-h-[500px] min-w-[200px] mt-2">
      <AddToCollectionPopup
        artwork={record}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <Link to={`/artwork/${record.source.toLowerCase()}/${record.id}`}>
        <div className="flex-grow text-center flex flex-col">
          <h2 className="text-xl font-bold line-clamp-2">{record.title}</h2>
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
          <p className="mb-4">{record.classification}</p>
          <div className="flex-grow flex items-center justify-center">
            {record.primaryimageurl ? (
              <img
                className="mb-4 mx-auto max-h-80 w-auto object-contain rounded shadow"
                src={record.primaryimageurl}
                alt={`${record.title} by ${
                  record.people?.[0]?.name || "Unidentified Artist"
                }`}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        </div>
      </Link>
      <div className="text-center mt-auto">
        <p>{record.people?.[0].name || "Unidentified Artist"}</p>
        <p className="text-sm">{record.dated}</p>
        <p className="text-sm">Harvard Art Museums/Fogg Museum</p>
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
          Add to Collection
        </button>
      </div>
    </div>
  );
}

export default HarvardArtCard;
