const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  requestPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  requestTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  requestTrending: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
  requestUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  requestHorror: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=horror&page=1&include_adult=false`,
};

export default requests;
