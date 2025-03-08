import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScreenWidthResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleScreenWidthResize);

    return () => window.removeEventListener("resize", handleScreenWidthResize);
  }, []);

  return width;
}

export default useScreenWidth;