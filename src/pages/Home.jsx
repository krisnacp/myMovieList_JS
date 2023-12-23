import { useEffect, useReducer } from "react";
import { getNowPlayingMovies, getTopRatedMovies } from "../api/API";
import { Link } from "react-router-dom";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton";

// instasiasi inialt argument untuk useReducer
const initialArg = {
  loading: false,
  nowPlayingMovies: [],
  topRatedMovies: [],
  error: null,
};

// TODO: function reducer untuk manage update state yang terjadi pada useReducer
function reducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, loading: action.payload };
    }
    case "nowPlayingDataReceived": {
      return { ...state, nowPlayingMovies: action.payload };
    }
    case "topRatedDataReceived": {
      return { ...state, topRatedMovies: action.payload };
    }
    case "error": {
      return { ...state, error: action.payload };
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialArg);

  // TODO: fetch data dari function getNowPlayingMovies ./API
  useEffect(() => {
    async function fetch() {
      try {
        dispatch({ type: "error", payload: null });
        dispatch({ type: "loading", payload: true });
        const data = await getNowPlayingMovies();
        dispatch({ type: "nowPlayingDataReceived", payload: data.results });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error", payload: error });
      }
    }
    fetch();
  }, []);

  // TODO: fetch data dari function getTopRatedMovies ./API
  useEffect(() => {
    async function fetch() {
      try {
        dispatch({ type: "error", payload: null });
        dispatch({ type: "loading", payload: true });
        const data = await getTopRatedMovies();
        dispatch({ type: "topRatedDataReceived", payload: data.results });
        dispatch({ type: "loading", payload: false });
      } catch (error) {
        console.log(error);
        dispatch({ type: "error", payload: error });
      }
    }
    fetch();
  }, []);

  // #111111

  return (
    <main className="grid h-full grid-rows-1 gap-8 bg-black px-10 pb-10 text-white">
      {/* Now Playing Section */}
      <section className="mt-8 overflow-hidden">
        <h1 className="text-5xl font-medium">Now Playing</h1>
        {/* card wrapper */}
        <div className="scroll-element mt-6 grid grid-flow-col gap-4 overflow-x-auto overscroll-x-contain px-2 pb-2">
          {/* card mapping */}
          {state.loading
            ? Array.from({ length: 7 }, (_, i) => {
                return <CardLoadingSkeleton key={i} />;
              })
            : state.nowPlayingMovies.map((nowPlayingMovie) => {
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
      </section>

      {/* Top Rated Section */}
      <section className="mt-8">
        <h1 className="text-5xl font-medium">Top Rated</h1>
        {/* card wrapper */}
        <div className="mt-6 grid grid-cols-7 gap-4">
          {/* card mapping */}
          {state.loading
            ? Array.from({ length: 7 }, (_, i) => {
                return <CardLoadingSkeleton key={i} />;
              })
            : state.topRatedMovies.map((nowPlayingMovie) => {
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
      </section>
    </main>
  );
}

export default Home;
