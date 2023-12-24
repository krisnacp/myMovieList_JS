import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import WatchList from "./pages/WatchList";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails.jsx";
import UserAuthProvider from "./context/AuthContext.jsx";
import SearchQueryContext from "./context/QueryContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path=":movie_id" element={<MovieDetails />} />
      <Route path="favorite" element={<Favorite />} />
      <Route path="watchlist" element={<WatchList />} />
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
