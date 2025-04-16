import ArtCard from "../components/ArtCard";
import { useEffect } from "react";
import { getAllArtwork, getPage, searchArtwork } from "../services/api";
import { useState } from "react";

function Home() {
  const [artwork, setArtwork] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        setLoading(true);

        let artworkData;
        if (searchQuery) {
          artworkData = await searchArtwork(searchQuery, page);
        } else {
          artworkData =
            page === 1 ? await getAllArtwork() : await getPage(page);
        }

        setArtwork(artworkData);
        setPageMax(artworkData.info.pages);
      } catch (err) {
        setError("Error fetching artwork");
      } finally {
        setLoading(false);
        setError(null);
      }
    };

    loadArtwork();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);

    try {
      const searchResults = await searchArtwork(searchQuery, 1);
      setArtwork(searchResults);
      setPage(1);
      setPageMax(searchResults.info.pages);
    } catch (err) {
      setError("Failed to seach movies");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  const changePage = (change) => {
    setPage((prevPage) => {
      const newPage = prevPage + change;
      console.log(prevPage, "<--- prev");
      console.log(newPage, "<--- curr");
      console.log(pageMax, "<--- max");
      return newPage;
    });
  };

  return (
    <div className="py-20 w-screen box-border">
      <form
        className="max-w-2xl mx-auto mb-8 flex gap-4 px-4 box-border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Search galleries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="py-3 px-6 bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && <div>{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid mx-auto px-25 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {artwork.records.map((record) => (
            <ArtCard record={record} key={record.id} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-10">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1">
          <button
            disabled={page === 1}
            className={`ml-3 rounded-md border px-4 py-1 text-base font-medium transition-colors duration-200
            ${
              page === 1
                ? "bg-gray-800 text-gray-400 border-gray-600"
                : "bg-[#1a1a1a] hover:border-blue-400/80 cursor-pointer"
            }
            `}
            onClick={() => {
              changePage(-1);
            }}
          >
            Previous
          </button>

          {page > 2 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(-2);
              }}
            >
              {page - 2}
            </button>
          )}

          {page > 1 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(-1);
              }}
            >
              {page - 1}
            </button>
          )}

          <button className="ml-3 rounded-md border px-4 py-1 font-medium bg-blue-500/50 shadow-md cursor-pointer">
            {page}
          </button>

          {page >= 1 && (
            <button
              disabled={page >= pageMax}
              className={`ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80
            ${
              page >= pageMax
                ? "bg-gray-800 text-gray-400 border-gray-600"
                : "bg-[#1a1a1a] hover:border-blue-400/80 cursor-pointer"
            }
            `}
              onClick={() => {
                changePage(1);
              }}
            >
              {page + 1}
            </button>
          )}

          {page >= 1 && (
            <button
              disabled={page + 2 > pageMax}
              className={`ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80
            ${
              page + 2 > pageMax
                ? "bg-gray-800 text-gray-400 border-gray-600"
                : "bg-[#1a1a1a] hover:border-blue-400/80 cursor-pointer"
            }
            `}
              onClick={() => {
                changePage(2);
              }}
            >
              {page + 2}
            </button>
          )}

          {page === 1 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(3);
              }}
            >
              {page + 3}
            </button>
          )}

          {page <= 2 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(4);
              }}
            >
              {page + 4}
            </button>
          )}

          <button
            disabled={page >= pageMax}
            className={`ml-3 rounded-md border px-7 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80
            ${
              page >= pageMax
                ? "bg-gray-800 text-gray-400 border-gray-600"
                : "bg-[#1a1a1a] hover:border-blue-400/80 cursor-pointer"
            }
            `}
            onClick={() => {
              changePage(1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
