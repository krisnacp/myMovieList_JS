import { useState, useEffect, useContext } from "react";
import { API_KEY, BASE_API_URL_V3 } from "../config/config";
import { optionsV3GET } from "../api/API";
import { useParams, Link, useNavigate } from "react-router-dom";
// import emptyHeart from "../assets/heart-empty-white.svg";
// import filledHeart from "../assets/heart-filled-white.svg";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { AuthContext } from "../context/AuthContext";

function WatchList() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [watchList, setwatchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account_id } = useParams();
  // const session_id = 42473264;
  // account/20845899/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc'
  if (session === null)
    navigate("login?message=Youmustloginfirstbeforeaccessingwatchlist");

  useEffect(() => {
    // TODO: function untuk fetch data Top Rated
    async function getWatchListMovies(account_id, session_id) {
      try {
        setLoading(true);
        const res = await fetch(
          `${BASE_API_URL_V3}account/${account_id}/watchlist/movies?language=en-US&page=1&session_id=${session_id}?api_key=${API_KEY}`,
          optionsV3GET,
        );
        const watchList = await res.json();
        setwatchList(watchList.results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getWatchListMovies(account_id, session.session_id);
  }, [account_id, session.session_id]);

  return (
    <section className="min-h-screen bg-black text-white">
      <div className="mt-8">
        <h1 className="text-5xl font-medium">Top Rated</h1>
        {/* card wrapper */}
        <div className="mt-6 grid grid-cols-7 gap-4">
          {/* card mapping */}
          {loading
            ? Array.from({ length: 7 }, (_, i) => {
                return <CardLoadingSkeleton key={i} />;
              })
            : watchList.map((nowPlayingMovie) => {
                const { id, title, release_date, poster_path } =
                  nowPlayingMovie;
                return (
                  <Link
                    to={`${id}`}
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
      </div>
    </section>
  );
}

export default WatchList;
