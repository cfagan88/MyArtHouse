const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL2 = import.meta.env.VITE_BASE_URL2;

// All Artwork From API's
export const getHarvardArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&sort=datebegin&page=${page}&size=12&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getAICArtwork = async (page) => {
  const response = await fetch(
    `${BASE_URL2}/api/v1/artworks?page=${page}&limit=12`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

// Search API's
export const searchHarvardArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&title=${query}&page=${page}&size=12&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const searchAICArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL2}/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&page=${page}&limit=12&fields=id,title,artwork_type_title,image_id,artist_title,date_display,`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};
