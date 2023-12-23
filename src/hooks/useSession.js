import { useState, useEffect } from "react";

function useSession(key) {
  const [value, setValue] = useState(
    () => JSON.parse(sessionStorage.getItem(key)) || [],
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useSession;
