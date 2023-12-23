import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteSessionV3 } from "../api/API";
import logout from "../assets/log-out-white.svg";
import { useState } from "react";

function MainNav() {
  const [loading, setLoading] = useState(false);
  const { session, setSession } = useContext(AuthContext);
  const navigate = useNavigate();

  // function handle delete session_id/logout
  async function handleDeleteSessionId() {
    try {
      setLoading(true);
      const status = await deleteSessionV3(session.sessionId);
      if (status.success) setSession(null);
      setLoading(false);
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="font-roboto bg-nav-bg-color grid h-[100px] w-full grid-cols-2 px-10 text-white ">
      {/* <button></button> */}
      <Link className="self-center text-5xl font-bold" to="/">
        MYMOVIELIST
      </Link>
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
        {session === null ? (
          <Link to="login">
            <li>Login</li>
          </Link>
        ) : loading ? (
          <div className="spin"></div>
        ) : (
          <li
            onClick={handleDeleteSessionId}
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
