import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleHarvardArtwork } from "../services/api";

function SingleHarvardArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchHarvardID = await getSingleHarvardArtwork(id);
        setArtwork(fetchHarvardID);
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
      <h1 className="text-3xl font-semibold mb-1">{artwork.title}</h1>
      <p className="mb-4">Harvard Art Museums/Fogg Museum</p>
      {artwork.primaryimageurl ? (
        <img
          className="mb-4 max-h-80 w-auto object-contain rounded shadow"
          src={artwork.primaryimageurl}
          alt={`${artwork.title} by ${
            artwork.people?.[0]?.name || "Unidentified Artist"
          }`}
        />
      ) : (
        <p>No image available</p>
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
        {artwork.description || "No description available."}
      </p>
    </article>
  );
}

export default SingleHarvardArtwork;
