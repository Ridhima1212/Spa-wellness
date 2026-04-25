import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);
};

export default useScrollHandler;