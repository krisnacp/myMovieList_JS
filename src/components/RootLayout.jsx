import MainNav from "./MainNav";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}

export default RootLayout;
