import { useState, useEffect, useContext } from "react";
import { API_KEY, BASE_API_URL_V3 } from "../config/config";
import {
  optionsV3GET,
  addFavMoviesV3,
  addWatchListV3,
  authV4,
} from "../api/API";
import { useParams, Link, useNavigate } from "react-router-dom";
import emptyHeart from "../assets/heart-empty-white.svg";
import emptyBookmark from "../assets/bookmark-empty-white.svg";
import filledHeart from "../assets/heart-filled-white.svg";
import filledBookmark from "../assets/bookmark-filled-white.svg";
import arrowLeft from "../assets/arrow-alt-left-black.svg";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import MovieDetailsLoadingSkeleton from "../components/MovieDetailsLoadingSkeleton";
import { AuthContext } from "../context/AuthContext";

function MovieDetails() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  const reqTokenV4 = sessionStorage.getItem("reqTokenV4");
  const [details, setdetails] = useState([]);
  const [recommMovies, setRecommMovies] = useState([]);
  const [fav, setFav] = useState(false);
  const [watch, setWatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const favoriteMovies = JSON.parse(localStorage.getItem("favorite_movies"));
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const { movie_id } = useParams();
  const {
    backdrop_path,
    genres,
    overview,
    poster_path,
    runtime,
    release_date,
    tagline,
    title,
    vote_average,
    id,
  } = details;
  const dateSlice = release_date?.split("-");
  const filterFavMovie = favoriteMovies
    ?.slice()
    .filter((movie) => movie.id === id);
  const filterWatchlist = watchlist?.slice().filter((movie) => movie.id === id);
  // console.log(filter);
  // console.log(favoriteMovies);
  // console.log(watchlist);
  // console.log(fav);

  // TODO: penggunaan effect untuk fetch details movie berdasarkan id details movie
  useEffect(() => {
    // TODO: function untuk fetch data Top Rated
    async function getTopRatedMovies(movie_id) {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_API_URL_V3}movie/${movie_id}?language=en-US?api_key=${API_KEY}`,
          optionsV3GET,
        );
        const topRated = await res.json();
        setdetails(topRated);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getTopRatedMovies(movie_id);
  }, [movie_id]);

  // TODO: penggunaan effect untuk fetch recomendation movies berdasarkan id details movie
  useEffect(() => {
    // TODO: function untuk fetch data Recommendations
    async function getTopRatedMovies(movie_id) {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_API_URL_V3}movie/${movie_id}/recommendations?language=en-US?api_key=${API_KEY}`,
          optionsV3GET,
        );
        const recommendations = await res.json();
        setRecommMovies(recommendations.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getTopRatedMovies(movie_id);
  }, [movie_id]);

  // TODO: function untuk handle click add to favorite movies
  async function addFavoriteMovies(event, movie_id) {
    event.preventDefault();
    if (session === null)
      navigate(
        "/login?message=Youmustloginfirstbeforeaddingmovietofavoritelist",
      );

    let copyArr = favoriteMovies.slice();
    const add = [...copyArr, details];
    const accId = await authV4(reqTokenV4);
    const addFavObj = {
      media_type: "movie",
      media_id: movie_id,
      favorite: true,
    };
    console.log(addFavObj);
    addFavMoviesV3(addFavObj, accId);
    localStorage.setItem("favorite_movies", JSON.stringify(add));
    setFav(true);
  }

  // TODO: function untuk handle click delete from favorite movies
  async function deleteFavoriteMovies(event, movie_id) {
    event.preventDefault();
    if (session === null)
      navigate(
        "/login?message=Youmustloginfirstbeforeaddingmovietofavoritelist",
      );

    const copyArr = favoriteMovies.slice().filter((movie) => movie.id !== id);
    const accId = await authV4(reqTokenV4);
    const delFavObj = {
      media_type: "movie",
      media_id: movie_id,
      favorite: false,
    };
    console.log(delFavObj);
    addFavMoviesV3(delFavObj, accId);
    localStorage.setItem("favorite_movies", JSON.stringify(copyArr));
    setFav(false);
  }

  // TODO: function untuk handle click add to watch list
  async function addWatchList(event, movie_id) {
    event.preventDefault();
    if (session === null)
      navigate(
        "/login?message=Youmustloginfirstbeforeaddingmovietofavoritelist",
      );

    let copyArr = watchlist.slice();
    const add = [...copyArr, details];
    const accId = await authV4(reqTokenV4);
    const addWatchObj = {
      media_type: "movie",
      media_id: movie_id,
      watchlist: true,
    };
    console.log(addWatchObj);
    addWatchListV3(addWatchObj, accId);
    localStorage.setItem("watchlist", JSON.stringify(add));
    setWatch(true);
  }

  // TODO: function untuk handle click delete from watch list
  async function deleteWatchList(event, movie_id) {
    event.preventDefault();
    if (session === null)
      navigate(
        "/login?message=Youmustloginfirstbeforeaddingmovietofavoritelist",
      );

    const copyArr = watchlist.slice().filter((movie) => movie.id !== id);
    const accId = await authV4(reqTokenV4);
    const addWatchObj = {
      media_type: "movie",
      media_id: movie_id,
      watchlist: false,
    };
    console.log(addWatchObj);
    addWatchListV3(addWatchObj, accId);
    localStorage.setItem("watchlist", JSON.stringify(copyArr));
    setWatch(false);
  }

  return (
    <section className=" min-h-screen bg-black text-white">
      {/* details Section */}
      {details.length === 0 ? (
        <MovieDetailsLoadingSkeleton />
      ) : (
        <div className="relative h-[400px] ">
          {/* back button */}
          <Link
            to=".."
            relative="path"
            className="absolute left-3 top-2 z-10 flex h-9 w-9 justify-center rounded-full bg-white text-black"
          >
            <img src={arrowLeft} alt="" />
          </Link>
          {/* backdrop image movie */}
          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
            alt={`movie poster ${title}`}
            className="h-[400px] w-full object-fill opacity-50"
          />
          {/* content section */}
          <div className="absolute inset-y-0 flex items-center gap-4 px-10">
            {/* poster section */}
            <img
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt={`movie poster ${title}`}
              className="h-[300px] w-[200px] rounded-md"
            />
            {/* movie details section */}
            <section className="text-[14px]">
              {/* title section */}
              <h1 className="mb-3 text-[32px] font-bold">
                {title} <span className=" font-normal">({dateSlice[0]})</span>
              </h1>
              {/* release_date, genre, runtime section */}
              <ul className="mb-3 flex list-disc gap-8 ">
                <li className="list-none">
                  {dateSlice[0]}/{dateSlice[1]}/{dateSlice[2]}
                </li>
                <li>
                  {genres.map(
                    (genre, i) =>
                      genre.name + `${i + 1 < genres.length ? ", " : ""}`,
                  )}
                </li>
                <li>
                  {Math.floor(runtime / 60)}h {runtime % 60}m
                </li>
              </ul>
              {/* rate, vote, bookmark section */}
              <div className="mb-3 flex items-center gap-1">
                <p>{vote_average}</p>
                {/* add favorite btn */}
                {filterFavMovie?.length === 0 ? (
                  <div
                    onClick={(e) => addFavoriteMovies(e, id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                  >
                    <img src={emptyHeart} alt="heart icon" />
                  </div>
                ) : (
                  <div
                    onClick={(e) => deleteFavoriteMovies(e, id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                  >
                    <img src={filledHeart} alt="heart icon" />
                  </div>
                )}

                {/* add watchlist btn */}
                {filterWatchlist?.length !== 0 ? (
                  <div
                    onClick={(e) => deleteWatchList(e, id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                  >
                    <img src={filledBookmark} alt="bookmark icon" />
                  </div>
                ) : (
                  <div
                    onClick={(e) => addWatchList(e, id)}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center"
                  >
                    <img src={emptyBookmark} alt="bookmark icon" />
                  </div>
                )}
              </div>
              <i>{tagline}</i>
              {/* overview section */}
              <section className="mt-1">
                <h3 className="font-bold">Overview</h3>
                <p>{overview}</p>
              </section>
            </section>
          </div>
        </div>
      )}

      {/* recomendation section */}
      <section className="mt-8 overflow-hidden px-10 pb-8">
        <h1 className="text-xl font-medium">Recommendations</h1>
        {/* card wrapper */}
        <div
          className={`scroll-element mt-6 ${
            recommMovies.length < 7 ? "flex" : "grid grid-flow-col"
          } gap-4 overflow-x-auto overscroll-x-contain px-2 pb-2`}
        >
          {/* card mapping */}
          {loading ? (
            Array.from({ length: 7 }, (_, i) => {
              return <CardLoadingSkeleton key={i} />;
            })
          ) : recommMovies.length === 0 ? (
            <h1>No movie recommendations</h1>
          ) : (
            recommMovies.map((nowPlayingMovie) => {
              const { id, title, release_date, poster_path } = nowPlayingMovie;
              return (
                <Link
                  to={`/${id}`}
                  className="h-[355px] w-48 overflow-y-hidden rounded-lg bg-card-bg-color"
                  key={id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={`movie poster ${title}`}
                    className="h-[289px] w-full "
                  />
                  <section className="mt-1 grid grid-rows-2 items-center px-4 text-card-text-color">
                    <h2 className="inline-block max-w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
                      {title}
                    </h2>
                    <p>{release_date.split("-")[0]}</p>
                  </section>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}

export default MovieDetails;
