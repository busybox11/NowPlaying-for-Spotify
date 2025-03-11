import { memo } from "react";

interface AlbumArtProps {
  imageSrc: string;
  isPaused: boolean;
}

const AlbumArt = ({ imageSrc, isPaused }: AlbumArtProps) => {
  return (
    <div className="relative w-[20rem] landscape:w-[20rem] landscape:lg:w-[30rem] md:w-[30rem] shrink-0">
      <img
        src={imageSrc}
        className="rounded-2xl h-auto w-full custom-img-shadow"
        alt="Album Art"
      />

      {isPaused && (
        <div className="absolute bottom-6 right-6 z-30 p-3 bg-black/20 border-2 border-white/60 text-white rounded-full backdrop-blur-lg shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-10 w-10"
            fill="currentColor"
          >
            <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default memo(AlbumArt);
