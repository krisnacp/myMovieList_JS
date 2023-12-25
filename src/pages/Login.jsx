import { useReducer, useContext } from "react";
import { getRequestTokenV3, authV3, getRequestTokenV4 } from "../api/API";
import { AuthContext } from "../context/AuthContext";

// variable untuk initialArgumen pada useReducer
const initialArg = {
  username: "",
  password: "",
  error: null,
  loading: false,
};

// membuat function untuk reducer
function reducer(state, action) {
  switch (action.type) {
    case "username": {
      return { ...state, username: action.payload };
    }
    case "password": {
      return { ...state, password: action.payload };
    }
    case "loading": {
      return { ...state, loading: action.payload };
    }
    case "error": {
      return { ...state, error: action.payload };
    }
    default:
      throw Error("Unknown action: " + action.type);
  }
}

function Login() {
  const [state, dispatch] = useReducer(reducer, initialArg);
  const { setSession } = useContext(AuthContext);

  // membuat function untuk handle generate new access token
  async function handleReqToken(e) {
    e.preventDefault();
    try {
      // jalankan dispatch yang diperlukan untuk status reach API
      dispatch({ type: "error", payload: null });
      dispatch({ type: "loading", payload: true });
      // panggil function untuk get request token API v3
      const token = await getRequestTokenV3();
      // panggil function untuk get request token API v4
      const reqTokenV4 = await getRequestTokenV4();
      // console.log(account_id);
      // panggil function untuk get sessionId yang parameter-nya diisi dengan reques_token dan username serta password dari user yang sudah register ke TMDB
      const authSessionID = await authV3(token, state.username, state.password);
      // memanggil global method yang sudah di-regiskan menggunakan cresteContext dan useContext
      const sessionObj = {
        sessionId: authSessionID.session_id,
        username: state.username,
        reqTokenV4: reqTokenV4,
      };
      setSession({
        sessionId: authSessionID.session_id,
        username: state.username,
        reqTokenV4: reqTokenV4,
      });
      sessionStorage.setItem("login", JSON.stringify(sessionObj));
      sessionStorage.setItem("sessionIdV3", authSessionID.session_id);
      sessionStorage.setItem("reqTokenV4", reqTokenV4);
      if (state.error === null) {
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${reqTokenV4}`;
      }
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  }

  // function untuk handle input field username
  function handleUsername(event) {
    dispatch({
      type: "username",
      payload: event.target.value,
    });
  }

  // function untuk handle input field password
  function handlePassword(event) {
    dispatch({
      type: "password",
      payload: event.target.value,
    });
  }

  return (
    <section className="grid h-[100dvh] grid-cols-1 bg-black py-8 text-white">
      <div className="mx-auto h-[600px] w-[500px] rounded-xl bg-card-bg-color px-12 py-8 text-center">
        <h1 className="text-4xl font-bold">Login</h1>
        <form className="mt-10 flex w-full flex-col gap-8" action="">
          {/* username section */}
          <section className="flex flex-col items-start justify-start">
            <label htmlFor="username">Username</label>
            <input
              className="h-[55px] w-full border-b bg-transparent px-2 outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Type your username"
              required
              onChange={(e) => handleUsername(e)}
              value={state.username}
            />
          </section>

          {/* password section */}
          <section className="flex flex-col items-start justify-start">
            <label htmlFor="password">Password</label>
            <input
              className="h-[55px] w-full border-b bg-transparent px-2 outline-none"
              type="password"
              name="password"
              id="password"
              placeholder="Type your password"
              required
              onChange={(e) => handlePassword(e)}
              value={state.password}
            />
          </section>
          <button
            className="flex h-12 w-full items-center justify-center rounded bg-zinc-700 text-xl font-semibold"
            onClick={(e) => handleReqToken(e)}
            disabled={state.loading}
          >
            {state.loading ? <div className="spin" /> : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;

// APPROVAL_URL = `https://www.themoviedb.org/auth/access?request_token={request_token}`
