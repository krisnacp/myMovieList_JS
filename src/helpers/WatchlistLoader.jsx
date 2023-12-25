import { redirect } from "react-router-dom";

export async function loader() {
  const login = JSON.parse(sessionStorage.getItem("login"));

  if (!login) {
    throw redirect("/login?Youmustloginfirsttoacceswatchlist");
  }
  return { login };
}
