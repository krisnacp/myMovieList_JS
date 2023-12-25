import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { QueryContext } from "../context/QueryContext";
import { deleteSessionV3, searchV3 } from "../api/API";
import logout from "../assets/log-out-white.svg";

function MainNav() {
  const [loading, setLoading] = useState(false);
  const { session, setSession } = useContext(AuthContext);
  const { setData } = useContext(QueryContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  // TODO: function handle delete session_id/logout
  async function handleDeleteSessionId() {
    try {
      setLoading(true);
      const status = await deleteSessionV3(session.sessionId);
      if (status.success) setSession(null);
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("reqTokenV4");
      sessionStorage.removeItem("sessionIdV3");
      localStorage.removeItem("favorite_movies");
      localStorage.removeItem("watchlist");
      setLoading(false);
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function dataFromQuery(querytext) {
      const res = await searchV3(querytext);
      setData(res);
    }
    dataFromQuery(query);
  }, [query, setData]);

  // TODO: function untuk handle change query search
  function handleSearch(event) {
    setQuery(event.target.value);
  }

  return (
    <nav className="grid h-[100px] w-full grid-cols-3 bg-nav-bg-color px-10 font-roboto text-white ">
      {/* Web title section */}
      <div className="self-center text-5xl font-bold ">
        <Link to="/">MYMOVIELIST</Link>
      </div>
      {/* search bar section */}
      <div className="flex items-center justify-center text-white">
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          className="h-3/5 w-full border-b-2 border-white bg-transparent px-2 text-2xl font-medium text-white outline-none placeholder:text-white"
          placeholder="Search movies here..."
          onChange={(e) => handleSearch(e)}
          value={query}
        />
      </div>
      {/* items-center grid-cols-[repeat(3,_minmax(0,_1fr)] grid-cols-3*/}
      <ul className="grid grid-cols-[repeat(3,_minmax(0,_min-content))] items-center justify-end gap-10 text-xl">
        <Link to="favorite">
          <li>Favorite</li>
        </Link>
        <button disabled={session === null}>
          <Link to="watchlist">
            <li>Watchlist</li>
          </Link>
        </button>
        {!session ? (
          <Link to="login">
            <li>Login</li>
          </Link>
        ) : loading ? (
          <div className="spin"></div>
        ) : (
          <li
            onClick={() => handleDeleteSessionId()}
            className="h-7 w-7 cursor-pointer"
          >
            <img src={logout} alt="logout logo svg" />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MainNav;
