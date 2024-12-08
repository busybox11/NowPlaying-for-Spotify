import { useEffect, useState } from "react";

export default function usePlayingImage(image: string) {
  // Keep the last image in the cache
  // until the next image is fully loaded
  const [lastImage, setLastImage] = useState(image);

  useEffect(() => {
    if (image === lastImage) return;

    const imageObj = new Image();
    imageObj.src = image;
    imageObj.onload = () => {
      setLastImage(imageObj.src);
    };
  }, [image]);

  return lastImage;
}
