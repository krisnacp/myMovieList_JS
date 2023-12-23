import { useState, useEffect } from "react";
import { API_KEY, BASE_API_URL_V3 } from "../config/config";
import { optionsV3GET } from "../api/API";
import { useParams, Link } from "react-router-dom";
import emptyHeart from "../assets/heart-empty-white.svg";
import filledHeart from "../assets/heart-filled-white.svg";
import arrowLeft from "../assets/arrow-alt-left-black.svg";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import MovieDetailsLoadingSkeleton from "../components/MovieDetailsLoadingSkeleton";

function MovieDetails() {
  const [details, setdetails] = useState([]);
  const [recommMovies, setRecommMovies] = useState([]);
  const [loading, setLoading] = useState(false);
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
  } = details;
  //   const dateSlice = release_date?.split("-");
  //   console.log(movie_Id);
  //   console.log(recommMovies);

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
    // TODO: function untuk fetch data Top Rated
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
              <h1 className="mb-3 text-[32px] font-bold">
                {title}{" "}
                <span className=" font-normal">
                  ({release_date?.split("-")[0]})
                </span>
              </h1>
              <ul className="mb-3 flex list-disc gap-8">
                <li className="list-none">
                  {release_date?.split("-")[0]}/{release_date?.split("-")[1]}/
                  {release_date?.split("-")[2]}
                </li>
                <li>{genres.map((genre, i) => genre.name + `, ${i}`)}</li>
                <li>
                  {Math.floor(runtime / 60)}h {runtime % 60}m
                </li>
              </ul>
              <div className="mb-3 flex gap-3">
                <p>{vote_average}</p>
                <div className="h-8 w-8">
                  <img src={emptyHeart} alt="" />
                </div>
                <div className="h-8 w-8">
                  <img src={filledHeart} alt="" />
                </div>
              </div>
              <i>{tagline}</i>
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
                <div
                  className="bg-card-bg-color h-[355px] w-48 overflow-y-hidden rounded-lg"
                  key={id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={`movie poster ${title}`}
                    className="h-[289px] w-full "
                  />
                  <section className="text-card-text-color mt-1 grid grid-rows-2 items-center px-4">
                    <h2 className="inline-block max-w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-lg font-semibold">
                      {title}
                    </h2>
                    <p>{release_date.split("-")[0]}</p>
                  </section>
                </div>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}

export default MovieDetails;
