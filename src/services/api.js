const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL_HARVARD = import.meta.env.VITE_BASE_URL_HARVARD;
const BASE_URL_CMA = import.meta.env.VITE_BASE_URL_CMA;

// -------------------------------------------------------------------------------------------------------------------------------------------
// All Artwork From API's
export const getHarvardArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object?apikey=${API_KEY}&q=imagepermissionlevel:0&hasimage=1&sort=createdate&sortorder=desc&page=${page}&size=12`
  );
  const data = await response.json();
  return data;
};

export const getCMAArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL_CMA}/artworks?orderby=+recently_acquired&has_image=1&limit=12&skip=${
      (page - 1) * 12
    }`
  );
  const data = await response.json();
  return data;
};

// -------------------------------------------------------------------------------------------------------------------------------------------
// Search API's
export const searchHarvardArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object?apikey=${API_KEY}&q=imagepermissionlevel:0&sort=createdate&sortorder=desc&title=${query}&page=${page}&size=12`
  );
  const data = await response.json();
  return data;
};

export const searchCMAArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL_CMA}/artworks/?q=${query}&sort=updated_at&limit=12&skip=${
      (page - 1) * 12
    }`
  );
  const data = await response.json();
  return data;
};

// -------------------------------------------------------------------------------------------------------------------------------------------
// Get Single Artwork
export const getSingleHarvardArtwork = async (id) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object/${id}?apikey=${API_KEY}&q=imagepermissionlevel:0&size=12`
  );
  const data = await response.json();
  return data;
};

export const getSingleCMAArtwork = async (id) => {
  const response = await fetch(`${BASE_URL_CMA}/artworks/${id}`);
  const data = await response.json();
  return data;
};
