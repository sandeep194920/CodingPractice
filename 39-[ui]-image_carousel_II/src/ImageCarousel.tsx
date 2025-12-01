import { useEffect, useRef, useState, type FC } from "react";

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

  /* We need to set the imageWidth dynamically by calculating the screen size */
  const [imageWidth, setImageWidth] = useState<number | null>(null);

  const imageCarouselContainerRef = useRef<HTMLDivElement | null>(null); // we need to attach this to image-carousel parent and then calculate the size

  // We should not transition while resizing
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const updateImageSize = () => {
      if (!imageCarouselContainerRef.current) return;

      // imageCarouselContainerRef.ref will be set after react's commit phase, so by the time this useEffect runs, we can expect imageCarouselContainerRef.ref to not be null
      setImageWidth(
        imageCarouselContainerRef.current.getBoundingClientRect().width || 0
      );
    };

    updateImageSize();

    /* updateImageSize function runs first time and also whenever the window is resized */

    window.addEventListener("resize", updateImageSize);

    return () => {
      window.removeEventListener("resize", updateImageSize);
    };
  }, []);

  // You can write the above window resize as the below useEffect - Look readme why this is better
  /* 
   useEffect(() => {
      if (!imageCarouselContainerRef.current) return;

      const resizeObserver = new ResizeObserver((entries) => {
        setImageWidth(entries[0].contentRect.width);
      });
      resizeObserver.observe(imageCarouselContainerRef.current);

        return () => {
    resizeObserver.disconnect(); 
      };
  }, []);
 */
  return (
    <div
      className="image-carousel"
      ref={imageCarouselContainerRef}
      onTransitionEnd={() => setIsTransitioning(false)}
    >
      {/* when key changes, the Img should re-render. We do this because we force image to re-render when key (src) changes which sometimes doesn't automatically do it. This force re-render will help smoothen the animation as we
force the image to re-render*/}
      <div
        className={clsx(
          `image-carousel__row`,
          // Only add transition class when there is a need to
          // animate the transition, otherwise the translation update
          // is also transitioned when resizing the screen.
          isTransitioning ? "image-carousel__transitioning" : undefined
        )}
        style={{
          transform: imageWidth
            ? `translateX(-${currIndex * imageWidth}px)`
            : undefined,
        }}
      >
        {images.map(({ src, alt }) => (
          <img src={src} alt={alt} key={src} className="image-carousel__img" />
        ))}
      </div>

      <button
        disabled={isTransitioning}
        onClick={() => {
          setIsTransitioning(true);
          setCurrIndex((currIndex - 1 + totalImages) % totalImages);
        }}
        className="image-carousel__button image-carousel__button__prev"
      >
        &#10094;
      </button>

      <div className="image-carousel__pages">
        {images.map(({ src, alt }, i) => (
          <button
            key={src}
            disabled={isTransitioning}
            onClick={() => {
              setCurrIndex(i);
              setIsTransitioning(true);
            }}
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
        disabled={isTransitioning}
        onClick={() => {
          setIsTransitioning(true);
          setCurrIndex((currIndex + 1) % totalImages);
        }}
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
