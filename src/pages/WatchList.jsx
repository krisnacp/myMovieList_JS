import { useState, useEffect, useContext } from "react";
import { API_KEY, BASE_API_URL_V4 } from "../config/config";
import { authV4, optionsV4GET } from "../api/API";
import { Link, useNavigate } from "react-router-dom";
// import emptyHeart from "../assets/heart-empty-white.svg";
// import filledHeart from "../assets/heart-filled-white.svg";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { AuthContext } from "../context/AuthContext";

function WatchList() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [watchList, setwatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const reqTokenV4 = sessionStorage.getItem("reqTokenV4");
  const sessionIdV3 = sessionStorage.getItem("sessionIdV3");

  if (session === null)
    navigate("login?message=Youmustloginfirstbeforeaccessingwatchlist");

  useEffect(() => {
    // TODO: function untuk fetch data Top Rated
    async function getWatchListMovies() {
      try {
        setLoading(true);
        const accId = await authV4(reqTokenV4);
        const res = await fetch(
          `${BASE_API_URL_V4}account/${accId}/movie/watchlist?page=1&language=en-US?api_key=${API_KEY}`,
          optionsV4GET,
        );
        const watchList = await res.json();
        setwatchList(watchList.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getWatchListMovies();
  }, [reqTokenV4, sessionIdV3]);

  return (
    <main className="min-h-screen bg-black px-10 pt-10 text-white">
      <h1 className="text-5xl font-medium">Watched List</h1>
      {/* card wrapper */}
      <div className="mt-6 grid grid-cols-7 gap-4">
        {/* card mapping */}
        {loading
          ? Array.from({ length: 7 }, (_, i) => {
              return <CardLoadingSkeleton key={i} />;
            })
          : watchList.map((nowPlayingMovie) => {
              const { id, title, release_date, poster_path } = nowPlayingMovie;
              return (
                <Link
                  to={`/${id}`}
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
                </Link>
              );
            })}
      </div>
    </main>
  );
}

export default WatchList;
