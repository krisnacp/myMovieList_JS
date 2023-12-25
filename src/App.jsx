import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import { loader as FavoriteLoader } from "./helpers/FavoriteLoader.jsx";
import { loader as WatchlistLoader } from "./helpers/WatchlistLoader.jsx";
import WatchList from "./pages/WatchList";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails.jsx";
import UserAuthProvider from "./context/AuthContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path=":movie_id" element={<MovieDetails />} />
      <Route path="favorite" loader={FavoriteLoader} element={<Favorite />} />
      <Route
        path="watchlist"
        loader={WatchlistLoader}
        element={<WatchList />}
      />
      <Route path="login" element={<Login />} />,
    </Route>,
  ),
);

function App() {
  return (
    <>
      <UserAuthProvider>
        {/* <SearchQueryContext> */}
        <RouterProvider router={router} />
        {/* </SearchQueryContext> */}
      </UserAuthProvider>
    </>
  );
}

export default App;
