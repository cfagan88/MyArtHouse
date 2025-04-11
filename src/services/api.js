const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllArtwork = async () => {
  const response = await fetch(`${BASE_URL}/object?apikey=${API_KEY}`);
  const data = await response.json();
  // console.log(data.records);
  return data.records;
};

export const searchArtwork = async (query) => {
  const response = await fetch(
    `${BASE_URL}/object?title=${query}&apikey=${API_KEY}`
  );
  const data = await response.json();
  // console.log(data.records);
  return data.records;
};
