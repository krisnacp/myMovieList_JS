import {
  //   API_KEY,
  API_ACCESS_TOKEN,
  //   BASE_API_URL_V4,
  REQUEST_TOKEN_URL_V4,
  ACCESS_TOKEN_URL_V4,
  //   BASE_API_URL_V3,
  REQUEST_TOKEN_URL_V3,
  LOGIN_URL_V3,
  SESSION_ID_URL_V3,
  DELETE_SESSION_ID_URL_V3,
  NOW_PLAYING_URL_V3,
  TOP_RATED_URL_V3,
} from "../config/config";

const optionsV3GET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer  ${API_ACCESS_TOKEN}`,
  },
};

const optionsV3POST = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer  ${API_ACCESS_TOKEN}`,
  },
};

const optionsV3DELETE = {
  method: "DELETE",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer  ${API_ACCESS_TOKEN}`,
  },
};

const optionsV4GET = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

const optionsV4POST = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${API_ACCESS_TOKEN}`,
  },
};

// TODO: function untuk request token API_v4
const getRequestTokenV4 = async () => {
  const res = await fetch(REQUEST_TOKEN_URL_V4, {
    ...optionsV4POST,
    body: JSON.stringify({ redirect_to: "http://localhost:5173/" }),
  });
  if (!res.ok) throw new Error("Error while fetching");
  const reqToken = await res.json();
  return reqToken.request_token;
};

// TODO: function untuk request token API_v4
const authV4 = async (token) => {
  const res = await fetch(ACCESS_TOKEN_URL_V4, {
    ...optionsV4POST,
    body: JSON.stringify({ request_token: token }),
  });
  if (!res.ok) throw new Error("Error while fetching");
  const acc_id = await res.json();
  return acc_id.account_id;
};

// TODO: function untuk request token API_v3
const getRequestTokenV3 = async () => {
  const res = await fetch(REQUEST_TOKEN_URL_V3, optionsV3GET);
  if (!res.ok) throw new Error("Error while fetching");
  const reqToken = await res.json();
  console.log(reqToken);
  return reqToken.request_token;
};

// TODO: function untuk login dengan akun yang sudah terdaftar pada TMDB
const authV3 = async (requestToken, username, password) => {
  // menampung data yang di-pass malalui parameter menjadi bentuk object
  const bodyData = {
    username,
    password,
    request_token: requestToken,
  };

  // request API untuk post data yang sudah ditulis dan didapat oleh user
  const data = await (
    await fetch(LOGIN_URL_V3, {
      ...optionsV3POST,
      body: JSON.stringify(bodyData),
    })
  ).json();

  // jika login sukses, maka urutan request kan berlanjutt ke-generate session id
  if (data.success) {
    const res = await fetch(SESSION_ID_URL_V3, {
      ...optionsV3POST,
      body: JSON.stringify({ request_token: requestToken }),
    });
    const sessionId = await res.json();
    return sessionId;
  }
};

// TODO: function untuk delete session_id method
const deleteSessionV3 = async (sessionId) => {
  const res = await fetch(DELETE_SESSION_ID_URL_V3, {
    ...optionsV3DELETE,
    body: JSON.stringify({ session_id: sessionId }),
  });
  const delete_sessionId = await res.json();
  return delete_sessionId;
};

// TODO: function untuk fetch data Now Playing
const getNowPlayingMovies = async () => {
  const res = await fetch(NOW_PLAYING_URL_V3, optionsV3GET);
  const nowPlaying = await res.json();
  return nowPlaying;
};

// TODO: function untuk fetch data Top Rated
const getTopRatedMovies = async () => {
  const res = await fetch(TOP_RATED_URL_V3, optionsV3GET);
  const topRated = await res.json();
  return topRated;
};

export {
  optionsV3GET,
  optionsV4GET,
  getRequestTokenV3,
  authV3,
  deleteSessionV3,
  getNowPlayingMovies,
  getTopRatedMovies,
  getRequestTokenV4,
  authV4,
};
