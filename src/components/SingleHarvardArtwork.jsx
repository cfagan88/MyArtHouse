import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleHarvardArtwork } from "../services/api";
import AddToCollectionPopup from "./AddToCollectionPopup";

function SingleHarvardArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchHarvardID = await getSingleHarvardArtwork(id);
        setArtwork({
          ...fetchHarvardID,
          source: "Harvard",
        });
      } catch (err) {
        setError("Failed to load artwork");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) return <p>Loading artwork...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative w-full min-h-screen">
      <AddToCollectionPopup
        artwork={artwork}
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <article className="max-w-screen py-22 px-10">
        <h1 className="text-3xl font-semibold mb-1">{artwork.title}</h1>
        <p className="mb-4">Harvard Art Museums/Fogg Museum</p>
        {artwork.primaryimageurl ? (
          <img
            className="mb-4 max-h-150 w-auto object-contain rounded shadow"
            src={artwork.primaryimageurl}
            alt={`${artwork.title} by ${
              artwork.people?.[0]?.name || "Unidentified Artist"
            }`}
          />
        ) : (
          <p>No Image Available</p>
        )}
        <p>
          <strong>Artist:</strong> {artwork.people?.[0]?.name || "Unknown"}
        </p>
        <p>
          <strong>Culture:</strong> {artwork.culture || "N/A"}
        </p>
        <p>
          <strong>Medium:</strong> {artwork.technique || "N/A"}
        </p>
        <p>
          <strong>Date:</strong> {artwork.dated || "N/A"}
        </p>
        <p>
          <strong>Description: </strong>{" "}
          {artwork.description || "No description available"}
        </p>
        <div className="flex justify-center mt-4">
          <button
            className="py-2 mt-4 w-full max-w-[200px] bg-blue-500/50 text-white rounded-md transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
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
      </article>
    </div>
  );
}

export default SingleHarvardArtwork;
