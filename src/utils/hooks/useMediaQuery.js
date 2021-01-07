import { useEffect, useState } from "react";

const useMediaQuery = (query) => {
  const mediaMatch = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e) => setMatches(e.matches);

    // addListener has been deprecated and addEventListener should be used instead.
    // mediaMatch.addEventListener("change", handler);
    mediaMatch.addListener(handler);
    // removeListener has been deprecated and removeEventlistener should be used instead.
    // return () => mediaMatch.removeEventListener("change", handler);
    return () => mediaMatch.removeListener(handler);
  });

  return matches;
};

export default useMediaQuery;
