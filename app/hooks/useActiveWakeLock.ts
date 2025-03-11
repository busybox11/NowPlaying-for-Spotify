import { useEffect } from "react";
import { useWakeLock } from "react-screen-wake-lock";

export default function useActiveWakeLock() {
  const { isSupported, request, release } = useWakeLock();

  useEffect(() => {
    if (isSupported) {
      request();
    }

    return () => {
      try {
        release();
      } catch (error) {
        console.error(error);
      }
    };
  }, []);
}
