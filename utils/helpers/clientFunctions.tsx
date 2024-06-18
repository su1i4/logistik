import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(1300);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowWidth;
};

export function formatDate(dateObj: any) {
  const year = dateObj.year;
  const month = String(dateObj.month).padStart(2, "0");
  const day = String(dateObj.day).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
