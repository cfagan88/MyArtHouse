import HarvardArtCard from "../components/HarvardArtCard";
import AICArtCard from "../components/AICArtCard";
import { useEffect } from "react";
import {
  getHarvardArtwork,
  getAICArtwork,
  searchHarvardArtwork,
  searchAICArtwork,
} from "../services/api";
import { useState } from "react";

function Home() {
  const [artwork, setArtwork] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [sortBy, setSortBy] = useState("date-added-new");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchHarvard = searchQuery
          ? searchHarvardArtwork(searchQuery, page)
          : getHarvardArtwork(page);
        const fetchAIC = searchQuery
          ? searchAICArtwork(searchQuery, page)
          : getAICArtwork(page);

        const [harvardArtwork, aicArtwork] = await Promise.all([
          fetchHarvard,
          fetchAIC,
        ]);

        const harvardArtWithSource = harvardArtwork.records.map((artwork) => ({
          ...artwork,
          source: "Harvard",
        }));

        const aicArtWithSource = aicArtwork.data.map((artwork) => ({
          ...artwork,
          source: "AIC",
        }));

        // const combinedArt = [...harvardArtWithSource, ...aicArtWithSource].sort(
        //   (a, b) => {
        //     const dateA = new Date(
        //       a.source === "Harvard" ? a.createdate : a.updated_at
        //     );
        //     const dateB = new Date(
        //       b.source === "Harvard" ? b.createdate : b.updated_at
        //     );

        //     if (sortBy === "date-added-new") {
        //       return dateB - dateA;
        //     } else if (sortBy === "date-created-old") {
        //       return dateA - dateB;
        //     }
        //   }
        // );

        setArtwork([...harvardArtWithSource, ...aicArtWithSource]);
        setPageMax(
          Math.max(harvardArtwork.info.pages, aicArtwork.pagination.total_pages)
        );
      } catch (err) {
        setError("Error fetching artwork");
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [searchQuery, page, sortBy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim() || loading) return;
    setPage(1);
    setSearchQuery(searchInput);
  };

  const changePage = (change) => {
    setPage((prevPage) => {
      const newPage = prevPage + change;
      return newPage;
    });
  };

  return (
    <div className="py-20 w-screen box-border">
      <form
        className="max-w-2xl mx-auto mb-3 flex gap-4 px-4 box-border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Search galleries..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          className="py-3 px-6 bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="px-25 mb-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="py-2 px-4 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="date-added-new">Date Added - Newest First</option>
          <option value="date-created-old">Date Added - Oldest First</option>
        </select>
      </div>

      {error && <div>{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : artwork.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No results found.</div>
      ) : (
        <div className="grid mx-auto px-25 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {artwork.map((record) =>
            record.source === "Harvard" ? (
              <HarvardArtCard record={record} key={`harvard${record.id}`} />
            ) : (
              <AICArtCard record={record} key={`aic${record.id}`} />
            )
          )}
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
              setPage(1);
            }}
          >
            {"<<"}
          </button>

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
            {"<"}
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

          {page >= 1 && page < pageMax && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(1);
              }}
            >
              {page + 1}
            </button>
          )}

          {page >= 1 && page < pageMax - 1 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(2);
              }}
            >
              {page + 2}
            </button>
          )}

          {page === 1 && pageMax !== 1 && (
            <button
              className="ml-3 rounded-md border px-4 py-1 text-base font-medium bg-[#1a1a1a] cursor-pointer transition-colors duration-200 hover:border-blue-400/80"
              onClick={() => {
                changePage(3);
              }}
            >
              {page + 3}
            </button>
          )}

          {page <= 2 && pageMax !== 1 && (
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
            {">"}
          </button>

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
              setPage(pageMax);
            }}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
