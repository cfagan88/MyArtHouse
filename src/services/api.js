const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL2 = import.meta.env.VITE_BASE_URL2;


// All Artwork From API's
export const getHarvardArtwork = async () => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&sort=datebegin&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getAICArtwork = async () => {
  const response = await fetch(`${BASE_URL2}/api/v1/artworks`);
  const data = await response.json();
  // console.log(data);
  return data;
};


// Search API's
export const getPage = async (page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&sort=datebegin&page=${page}&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};


// Pagination
export const searchArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&title=${query}&page=${page}&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};