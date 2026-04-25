/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReloadRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isReload =
      window.performance
        .getEntriesByType("navigation")[0]
        ?.type === "reload";

    if (isReload && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, []);

  return children;
};

export default ReloadRedirect;
