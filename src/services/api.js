const API_KEY = "6281fb0079458eb4016319fa6e66a4d2";
const BASE_URL = "https://api.themoviedb.org/3";
const API_READ_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjgxZmIwMDc5NDU4ZWI0MDE2MzE5ZmE2ZTY2YTRkMiIsIm5iZiI6MTczNDc5OTIxNC41MTksInN1YiI6IjY3NjZlZjZlOGNhNTNjYzZhNzVlMTc5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H26lCZFoS1YQAJmKcyFPKjofuNEBYfS1aoV1C9En1V8";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&api_read_access_token=${API_READ_ACCESS_TOKEN}`,
  );
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );
    const data = await response.json();
    console.log("Search API response:", data);
    return data.results || [];
  } catch (err) {
    console.log("Error during search:", err);
    throw new Error("Failed to fetch search results");
  }
};

export const getActionMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&api_read_access_token=${API_READ_ACCESS_TOKEN}&with_genres=28`,
    );

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.log("Error during search: ", err);
    throw new Error("Failed to load action movies");
  }
};

export const getRomanceMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&api_read_access_token=${API_READ_ACCESS_TOKEN}&with_genres=10749`,
    );

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.log("Error during search: ", err);
    throw new Error("Failed to load action movies");
  }
};

export const getAnimatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&api_read_access_token=${API_READ_ACCESS_TOKEN}&with_genres=16`,
    );

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.log("Error during search: ", err);
    throw new Error("Failed to load action movies");
  }
};
