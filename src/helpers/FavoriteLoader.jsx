import { redirect } from "react-router-dom";

export async function loader() {
  const session = sessionStorage.getItem("sessionIdV3");
  const reqTokenV4 = sessionStorage.getItem("reqTokenV4");
  if (!session) {
    throw redirect("/login?Youmustloginfirsttoaccesfavorite");
  }
  return { session, reqTokenV4 };
}
