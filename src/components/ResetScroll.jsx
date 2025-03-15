import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Pathname listener that reset the scroll position when the pathname changed.
 */
export default function ResetScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    const c = document.getElementById("container");
    if (c) c.scrollTo(0, 0);
  }, [pathname]);

  return null;
}