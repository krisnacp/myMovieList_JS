import { createContext, useState } from "react";

const QueryContext = createContext([]);

// membuat react jsx/tsx.element yang nantinya akan digunakan menerima data dari component lain atau dari luar (API)
function SearchQueryContext({ children }) {
  const [data, setData] = useState([]);
  const value = {
    data,
    setData,
  };
  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
}

export { QueryContext };
export default SearchQueryContext;
