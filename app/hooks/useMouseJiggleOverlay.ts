import { useEffect, useState } from "react";

export default function useMouseJiggleOverlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowOverlay(true);
      document.body.style.cursor = "default";

      window.clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowOverlay(false);
        document.body.style.cursor = "none";
      }, 6000);
    };

    let timeout: NodeJS.Timeout;

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove();

    return () => {
      try {
        window.removeEventListener("mousemove", handleMouseMove);
        document.body.style.cursor = "unset";
        window.clearTimeout(timeout);
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  return showOverlay;
}
