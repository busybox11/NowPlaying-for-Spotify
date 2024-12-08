import { useEffect, useState } from "react";

export default function useMouseJiggleOverlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowOverlay(true);

      window.clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowOverlay(false);
      }, 6000);
    };

    let timeout: NodeJS.Timeout;

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return showOverlay;
}
