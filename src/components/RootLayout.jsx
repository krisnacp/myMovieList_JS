import SearchQueryContext from "../context/QueryContext";
import MainNav from "./MainNav";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <SearchQueryContext>
        <MainNav />
        <Outlet />
      </SearchQueryContext>
    </>
  );
}

export default RootLayout;
