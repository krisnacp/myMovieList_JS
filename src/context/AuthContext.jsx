import { createContext, useState } from "react";
// import PropTypes from "prop-types";

// instansiasi variable createContext yang nantinya akan digunakan sebagai komponen pembungkus agar bisa mem-pass data pada component yang dibungkus atau dibawahnya
const AuthContext = createContext({
  sessionId: null,
  username: null,
  reqTokenV4: null,
});

// membuat react jsx/tsx.element yang nantinya akan digunakan menerima data dari component lain atau dari luar (API)
function UserAuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    return JSON.parse(sessionStorage.getItem("login")) || null;
  });
  const value = {
    session,
    setSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default UserAuthProvider;
