import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCMAArtwork } from "../services/api";
import DOMPurify from "dompurify";
import { useCollectionsContext } from "../contexts/collectionsContext";

function SingleCMAArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { collections, addArtworkToCollection } = useCollectionsContext();

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchCMAID = await getSingleCMAArtwork(id);
        setArtwork(fetchCMAID.data);
      } catch (err) {
        setError("Failed to load artwork.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  if (loading) return <div>Loading artwork...</div>;
  if (error) return <div>{error}</div>;
  return (
    <article className="max-w-4xl mx-auto pt-20 py-10 px-4">
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
                        addArtworkToCollection(col.name, artwork);
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
      <h1 className="text-3xl font-semibold mb-1">{artwork.title}</h1>
      <p className="mb-4">Cleveland Museum of Art</p>
      {artwork.images?.web?.url ? (
        <img
          className="mb-4 max-h-80 w-auto object-contain rounded shadow"
          src={artwork.images.web.url}
          alt={`${artwork.title} by ${
            artwork.creators[0]?.description || "Unidentified Artist"
          }`}
        />
      ) : (
        <p>No Image Available</p>
      )}
      <p>
        <strong>Artist:</strong> {artwork.creators[0]?.description || "Unknown"}
      </p>
      <p>
        <strong>Culture:</strong> {artwork.culture[0] || "N/A"}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.technique || "N/A"}
      </p>
      <p>
        <strong>Date:</strong> {artwork.creation_date || "N/A"}
      </p>
      <p>
        <strong>Description: </strong>
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(artwork.description || "N/A"),
          }}
        />
      </p>
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
    </article>
  );
}

export default SingleCMAArtwork;
