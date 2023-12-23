import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";
import { AuthContext } from "../context/AuthContext";

function Favorite() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const favorite_movies = JSON.parse(localStorage.getItem("favorite_movies"));

  if (session === null)
    navigate("login?message=Youmustloginfirstbeforeaccessingfavorite");

  return (
    <main className="min-h-screen bg-black px-10 pt-10 text-white">
      <h1 className="text-5xl font-medium">Your Favorite Movies</h1>
      {/* card wrapper */}
      <div className="mt-6 grid grid-cols-7 gap-4">
        {/* card mapping */}
        {loading
          ? Array.from({ length: 7 }, (_, i) => {
              return <CardLoadingSkeleton key={i} />;
            })
          : favorite_movies.map((nowPlayingMovie) => {
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

export default Favorite;
