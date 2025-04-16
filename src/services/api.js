const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllArtwork = async () => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getPage = async (page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&page=${page}&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};

export const searchArtwork = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}/object?apikey=${API_KEY}&title=${query}&page=${page}&q=imagepermissionlevel:0`
  );
  const data = await response.json();
  // console.log(data);
  return data;
};
