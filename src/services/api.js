const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllArtwork = async () => {
  const response = await fetch(`${BASE_URL}/object?apikey=${API_KEY}&page=1`);
  const data = await response.json();
  console.log(data);
  return data;
};

export const getPage = async (page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const searchArtwork = async (query) => {
  const response = await fetch(
    `${BASE_URL}/object?title=${query}&apikey=${API_KEY}`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};
