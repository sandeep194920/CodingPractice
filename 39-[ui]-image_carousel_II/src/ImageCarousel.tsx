import { useState, type FC } from "react";

type Image = {
  src: string;
  alt: string;
};

interface ImageCarouselProps {
  images: Array<Image>;
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const [currIndex, setCurrIndex] = useState(0);

  const totalImages = images.length;

  return (
    <div className="image-carousel">
      {/* when key changes, the Img should re-render. We do this because we force image to re-render when key (src) changes which sometimes doesn't automatically do it. This force re-render will help smoothen the animation as we
force the image to re-render*/}
      <div
        className="image-carousel__row"
        style={{ transform: `translateX(-${currIndex * 600}px)` }}
      >
        {images.map(({ src, alt }) => (
          <img src={src} alt={alt} key={src} className="image-carousel__img" />
        ))}
      </div>

      <button
        onClick={() =>
          setCurrIndex((currIndex - 1 + totalImages) % totalImages)
        }
        className="image-carousel__button image-carousel__button__prev"
      >
        &#10094;
      </button>

      <div className="image-carousel__pages">
        {images.map(({ alt }, i) => (
          <button
            onClick={() => setCurrIndex(i)}
            className={clsx(
              "image-carousel__pages__button",
              i === currIndex
                ? "image-carousel__pages__button__active"
                : undefined
            )}
            aria-label={`Go to image ${alt}`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrIndex((currIndex + 1) % totalImages)}
        className="image-carousel__button image-carousel__button__next"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;

const clsx = (...classNames: Array<string | undefined>) => {
  return classNames.filter(Boolean).join(" ");
};
