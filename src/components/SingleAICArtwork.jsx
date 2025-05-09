import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleAICArtwork } from "../services/api";

function SingleAICArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchAICID = await getSingleAICArtwork(id);
        setArtwork(fetchAICID.data);
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
    <div className="max-w-4xl mx-auto pt-20 py-10 px-4">
      <h1 className="text-3xl font-semibold mb-4">{artwork.title}</h1>
      {artwork.image_id ? (
        <img
          src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
          alt={`${artwork.title} by ${
            artwork.artist_title || "Unidentified Artist"
          }`}
          className="mb-4 max-w-full h-auto rounded shadow"
        />
      ) : (
        <p>No image available</p>
      )}
      <p>
        <strong>Artist:</strong> {artwork.artist_title || "Unknown"}
      </p>
      <p>
        <strong>Culture:</strong> {artwork.style_title || "N/A"}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium_display || "N/A"}
      </p>
      <p>
        <strong>Date:</strong> {artwork.date_display || "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {artwork.description || "N/A"}
      </p>
    </div>
  );
}

export default SingleAICArtwork;
