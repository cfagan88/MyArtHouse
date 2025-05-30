import HarvardArtCard from "../components/HarvardArtCard";
import CMAArtCard from "../components/CMAArtCard";
import { getNewPage } from "../utils/getNewPage";
import { useState, useEffect } from "react";
import {
  getHarvardArtwork,
  getCMAArtwork,
  searchHarvardArtwork,
  searchCMAArtwork,
} from "../services/api";

function Home() {
  const [artwork, setArtwork] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageMax, setPageMax] = useState(1);
  const [sortBy, setSortBy] = useState("date-added-new");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const validCharsRegex = /^[\w\s.,'-]*$/;

  useEffect(() => {
    const loadArtwork = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchHarvard = searchQuery
          ? searchHarvardArtwork(searchQuery, page)
          : getHarvardArtwork(page);
        const fetchCMA = searchQuery
          ? searchCMAArtwork(searchQuery, page)
          : getCMAArtwork(page);

        const [harvardArtwork, cmaArtwork] = await Promise.all([
          fetchHarvard,
          fetchCMA,
        ]);

        const harvardArtWithSource = harvardArtwork.records.map((artwork) => ({
          ...artwork,
          source: "Harvard",
        }));

        const cmaArtWithSource = cmaArtwork.data.map((artwork) => ({
          ...artwork,
          source: "CMA",
        }));

        const combinedArt = [...harvardArtWithSource, ...cmaArtWithSource].sort(
          (a, b) => {
            const dateA = new Date(
              a.source === "Harvard"
                ? a.createdate
                : a.updated_at.replace(" ", "T").split(".")[0]
            );
            const dateB = new Date(
              b.source === "Harvard"
                ? b.createdate
                : b.updated_at.replace(" ", "T").split(".")[0]
            );

            if (sortBy === "date-added-new") {
              return dateB - dateA;
            } else if (sortBy === "date-created-old") {
              return dateA - dateB;
            }
          }
        );

        setArtwork(combinedArt);
        setPageMax(
          Math.max(
            harvardArtwork.info.pages,
            Math.ceil(cmaArtwork.info.total / 12)
          )
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
    if (loading) return;
    if (!searchInput.trim()) {
      setError("Please enter a search term.");
      return;
    }
    if (!validCharsRegex.test(searchInput)) {
      setError(
        "Please use only letters, spaces, and standard punctuation."
      );
      return;
    }
    setError("");
    setPage(1);
    setSearchQuery(searchInput);
  };

  return (
    <div className="py-20 w-screen box-border">
      <form
        className="max-w-2xl mx-auto mb-3 flex gap-4 px-4 box-border"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="flex-1 py-3 px-4 min-w-40 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Search galleries..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          className="py-3 px-5 bg-blue-500/50 text-white rounded-md font-medium transition-colors duration-200 whitespace-nowrap hover:bg-blue-400/80"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="flex justify-center px-10">
          <div className="text-lg text-red-500 font-semibold">{error}</div>
        </div>
      )}

      <div className="px-10 mb-3">
        <p className="mb-2">Sort By:</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="py-2 px-4 border-none rounded-md bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          <option value="date-added-new">Date Added - Newest First</option>
          <option value="date-created-old">Date Added - Oldest First</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-2xl font-semibold">Loading...</p>
        </div>
      ) : (
        <div className="grid mx-auto px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
          {artwork.map((record) =>
            record.source === "Harvard" ? (
              <HarvardArtCard record={record} key={`harvard${record.id}`} />
            ) : (
              <CMAArtCard record={record} key={`cma${record.id}`} />
            )
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-18">
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
