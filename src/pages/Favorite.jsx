import { useState } from "react";
import { Link } from "react-router-dom";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";

// !keterangan: route halaman ini menggunakan loader
function Favorite() {
  // loading state ini di-set seperti berikut dalam lingkup kasus jika dat diambil dari local storage atau sudah di cached
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  const favorite_movies = JSON.parse(localStorage.getItem("favorite_movies"));

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
          : favorite_movies?.map((nowPlayingMovie) => {
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
            })}
      </div>
    </main>
  );
}

export default Favorite;
