import { useCallback, useRef, useState } from "react";

const targetDefaultElement = () => {
  if (typeof document !== "undefined") {
    return document.body;
  }

  return null;
};

export default function useFullScreenElement(element?: HTMLElement) {
  const elementRef = useRef<HTMLElement>(element ?? targetDefaultElement());

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      elementRef.current?.requestFullscreen();
    }

    setIsFullScreen(document.fullscreenElement === elementRef.current);
  }, []);

  return {
    isFullScreen,
    toggleFullScreen,
    elementRef,
  };
}
