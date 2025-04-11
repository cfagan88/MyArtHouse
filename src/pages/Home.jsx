import ArtCard from "../components/ArtCard";
import { useEffect } from "react";
import { getAllArtwork, searchArtwork } from "../services/api";
import { useState } from "react";

function Home() {
  const [artwork, setArtwork] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const allArtwork = await getAllArtwork();
        setArtwork(allArtwork);
      } catch (err) {
        setError("Error fetching artwork");
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    loadArtwork();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchArtwork(searchQuery);
      setArtwork(searchResults);
    } catch (err) {
      setError("Failed to seach movies");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return (
    <div className="py-20 w-full box-border">
      <form
        className="max-w-2xl mx-auto mb-8 flex gap-4 px-4 box-border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 border-none rounded-md bg-gray-800 text-white text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Search galleries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="py-3 px-6 bg-red-700 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-red-800"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && <div>{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artwork.map((record) => (
            <ArtCard record={record} key={record.id} />
          ))}
        </div>
      )}

      <div>Go to page:</div>
    </div>
  );
}

export default Home;
