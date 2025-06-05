import { useEffect, useState } from "react";
import fallbackImage from "@/assets/no_song.png";

const IMAGE_LOAD_TIMEOUT = 1000;

export default function usePlayingImage(image: string) {
  // Keep the last image in the cache
  // until the next image is fully loaded
  const [lastImage, setLastImage] = useState(image);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (image === lastImage) return;

    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      setLastImage(imageObj.src);
      clearTimeout(timeout);
    };

    timeout = setTimeout(() => {
      setLastImage(fallbackImage);
    }, IMAGE_LOAD_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [image]);

  return lastImage;
}
