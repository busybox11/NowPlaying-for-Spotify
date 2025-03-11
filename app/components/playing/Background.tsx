import { memo } from "react";
interface BackgroundProps {
  imageSrc: string;
}

const Background = ({ imageSrc }: BackgroundProps) => {
  return (
    <div
      id="background-image-div"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-0 w-[max(115vh,115vw)] h-[max(115vh,115vw)]"
    >
      <div
        className="bg-cover bg-center transition-[background] duration-[2s] ease-in-out z-[-10] h-full w-full blur-3xl transform-gpu"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      >
        <div className="h-full w-full bg-black/40"></div>
      </div>
    </div>
  );
};

export default memo(Background);
