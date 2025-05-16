const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL_HARVARD = import.meta.env.VITE_BASE_URL_HARVARD;
const BASE_URL_AIC = import.meta.env.VITE_BASE_URL_AIC;

// -------------------------------------------------------------------------------------------------------------------------------------------
// All Artwork From API's
export const getHarvardArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object?apikey=${API_KEY}&q=imagepermissionlevel:0&hasimage=1&sort=createdate&sortorder=desc&page=${page}&size=12`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getAICArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL_AIC}/api/v1/artworks?is_public_domain=true&page=${page}&limit=12`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

// -------------------------------------------------------------------------------------------------------------------------------------------
// Search API's
export const searchHarvardArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object?apikey=${API_KEY}&q=imagepermissionlevel:0&sort=createdate&sortorder=desc&title=${query}&page=${page}&size=12`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const searchAICArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL_AIC}/api/v1/artworks/search?q=${query}&is_public_domain=true&page=${page}&limit=12&fields=id,title,artwork_type_title,image_id,artist_title,date_display,timestamp,`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

// -------------------------------------------------------------------------------------------------------------------------------------------
// Get Single Artwork
export const getSingleHarvardArtwork = async (id) => {
  const response = await fetch(
    `${BASE_URL_HARVARD}/object/${id}?apikey=${API_KEY}&q=imagepermissionlevel:0&size=12`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getSingleAICArtwork = async (id) => {
  const response = await fetch(`${BASE_URL_AIC}/api/v1/artworks/${id}`);
  const data = await response.json();
  // console.log(data);
  return data;
};
