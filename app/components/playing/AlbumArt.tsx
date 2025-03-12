import { memo } from "react";
import { LuPause } from "react-icons/lu";

interface AlbumArtProps {
  imageSrc: string;
  isPaused: boolean;
}

const AlbumArt = ({ imageSrc, isPaused }: AlbumArtProps) => {
  return (
    <div className="relative w-[20rem] landscape:w-[20rem] landscape:lg:w-[30rem] md:w-[30rem] shrink-0">
      <img
        src={imageSrc}
        className="rounded-2xl h-auto w-full custom-img-shadow z-20"
        alt="Album Art"
      />

      <div className="absolute inset-0 ring-2 ring-inset ring-white/5 rounded-2xl z-50 border border-black/50 pointer-events-none"></div>

      {isPaused && (
        <div className="absolute bottom-6 right-6 z-30 p-3 bg-black/30 border-2 border-white/50 ring ring-black/75 text-white rounded-full backdrop-blur-lg shadow-xl">
          <LuPause
            className="size-10"
            fill="currentColor"
            stroke="transparent"
          />
        </div>
      )}
    </div>
  );
};

export default memo(AlbumArt);
