import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleCMAArtwork } from "../services/api";
import DOMPurify from "dompurify";

function SingleCMAArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    </article>
  );
}

export default SingleCMAArtwork;
