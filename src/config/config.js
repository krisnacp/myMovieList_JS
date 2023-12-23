const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_ACCESS_TOKEN = import.meta.env.VITE_TMDB_API_ACCESS_TOKEN;

// konfigurasi URL API_v4
const BASE_API_URL_V4 = "https://api.themoviedb.org/4/";
const REQUEST_TOKEN_URL_V4 = `${BASE_API_URL_V4}auth/request_token?api_key=${API_KEY}`;
const ACCESS_TOKEN_URL_V4 = `${BASE_API_URL_V4}auth/access_token?api_key=${API_KEY}`;

// konfigurasi URL API_v3
const BASE_API_URL_V3 = "https://api.themoviedb.org/3/";
const REQUEST_TOKEN_URL_V3 = `${BASE_API_URL_V3}authentication/token/new?api_key=${API_KEY}`;
const LOGIN_URL_V3 = `${BASE_API_URL_V3}authentication/token/validate_with_login?api_key=${API_KEY}`;
const SESSION_ID_URL_V3 = `${BASE_API_URL_V3}authentication/session/new?api_key=${API_KEY}`;
const DELETE_SESSION_ID_URL_V3 = `${BASE_API_URL_V3}authentication/session?api_key=${API_KEY}`;
const NOW_PLAYING_URL_V3 = `${BASE_API_URL_V3}movie/now_playing?language=en-US&page=1?api_key=${API_KEY}`;
const TOP_RATED_URL_V3 = `${BASE_API_URL_V3}movie/top_rated?language=en-US&page=1?api_key=${API_KEY}`;
// const DETAILS_MOVIE_URL_V3 = `${BASE_API_URL_V3}movie/${movie_id}?language=en-US?api_key=${API_KEY}`;

//
export {
  API_KEY,
  API_ACCESS_TOKEN,
  BASE_API_URL_V4,
  REQUEST_TOKEN_URL_V4,
  ACCESS_TOKEN_URL_V4,
  BASE_API_URL_V3,
  REQUEST_TOKEN_URL_V3,
  LOGIN_URL_V3,
  SESSION_ID_URL_V3,
  DELETE_SESSION_ID_URL_V3,
  NOW_PLAYING_URL_V3,
  TOP_RATED_URL_V3,
  // SEARCH_BASE_URL,
  // POPULAR_BASE_URL,
};
