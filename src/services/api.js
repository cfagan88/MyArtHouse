const API_KEY = "b9c1b860-416f-4c5d-a58c-05dacfd03997";
const BASE_URL = "https://api.harvardartmuseums.org";

export const getAllArtwork = async () => {
  const response = await fetch(`${BASE_URL}/object?api_key=${API_KEY}`);
  const data = await response.json();
  console.log(data.results);
  return data.results;
};
