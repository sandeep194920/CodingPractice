import { useState, type FC } from "react";

type Image = {
  src: string;
  alt: string;
};

interface ImageCarouselProps {
  images: Array<Image>;
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images }) => {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeImageIndex = (index: number) => {
    setNextIndex(index);

    requestAnimationFrame(() => {
      setIsTransitioning(true);
    });
  };

  const currImg = images[currIndex];
  const nextImage = nextIndex !== null ? images[nextIndex] : null;

  const totalImages = images.length;

  const { currImgExitClass, nextImageEntryClass } =
    nextIndex !== null &&
    shouldTransitionToLeftDirection(currIndex, nextIndex, totalImages)
      ? {
          currImgExitClass: "image-carousel__image--displaced-left",
          nextImageEntryClass: "image-carousel__image--displaced-right",
        }
      : {
          currImgExitClass: "image-carousel__image--displaced-right",
          nextImageEntryClass: "image-carousel__image--displaced-left",
        };

  return (
    <div className="image-carousel">
      {/* when key changes, the Img should re-render. We do this because we force image to re-render when key (src) changes which sometimes doesn't automatically do it. This force re-render will help smoothen the animation as we
force the image to re-render*/}
      {currImg && (
        <img
          src={currImg.src}
          alt={currImg.alt}
          key={currImg.src}
          className={clsx(
            "image-carousel__img",
            isTransitioning
              ? currImgExitClass
              : "image-carousel__image--transform-to-current" // setting this undefined also gives you translate(0%) because it is like bringing it back to normal (removing transitions). But I've added a class explicitly
          )}
          onTransitionEnd={() => {
            if (nextIndex !== null) {
              setCurrIndex(nextIndex);
              setNextIndex(null);
              setIsTransitioning(false);
            }
          }}
        />
      )}

      {/* The moment you click next or prev button, this image will be available as nextImage in the dom tranformed either to left or right depending on button clicked
      Then RAF waits until the browser paint happens in the commit phase, then calls callback in RAF which sets isTransitioning to true that would cause re-render again which transforms (with animation due to transition applied in css )
      */}

      {nextImage !== null && (
        <img
          src={nextImage.src}
          alt={nextImage.alt}
          key={nextImage.src}
          onTransitionEnd={() => {
            setCurrIndex(nextIndex!);
            setNextIndex(null);
            setIsTransitioning(false);
          }}
          className={clsx(
            "image-carousel__img",
            isTransitioning
              ? "image-carousel__image--transform-to-current" // gets it to normal position which is translate(0%)
              : nextImageEntryClass
          )}
        />
      )}

      <button
        onClick={() =>
          changeImageIndex((currIndex - 1 + totalImages) % totalImages)
        }
        className="image-carousel__button image-carousel__button__prev"
      >
        &#10094;
      </button>

      <div className="image-carousel__pages">
        {images.map(({ alt }, i) => (
          <button
            onClick={() => changeImageIndex(i)}
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
        onClick={() => changeImageIndex((currIndex + 1) % totalImages)}
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

/* This is a long way of writing - so official solution is better in terms of dividing it into shouldTransitionToLeftDirection which just returns boolean based on which you can deduce classNames  - I added it below*/
// const getClassNames = (
//   currIndex: number,
//   nextIndex: number | null,
//   totalImages: number
// ) => {
//   let currImgExitClass = ""; // applied on currentImage always
//   let nextImageEntryClass = "";

//   if (nextIndex === null) return { currImgExitClass, nextImageEntryClass };

//   /* Click Next -> Eg. currentIndex = 3, nextIndex = 4   OR currentIndex = 4 nextIndex = 0 (last image)*/

//   // Next Button - Edge case

//   // forward transition
//   if (currIndex === totalImages - 1 && nextIndex === 0) {
//     currImgExitClass = "image-carousel__image--displaced-left";
//     nextImageEntryClass = "image-carousel__image--displaced-right";

//     return { currImgExitClass, nextImageEntryClass };
//   }

//   // Previous Button - Edge case
//   // backward transition
//   if (currIndex === 0 && nextIndex === totalImages - 1) {
//     console.log({ currIndex, nextIndex });
//     currImgExitClass = "image-carousel__image--displaced-right";
//     nextImageEntryClass = "image-carousel__image--displaced-left";
//     return { currImgExitClass, nextImageEntryClass };
//   }

//   // Next Button

//   // forward transition
//   if (currIndex < nextIndex) {
//     currImgExitClass = "image-carousel__image--displaced-left";
//     nextImageEntryClass = "image-carousel__image--displaced-right";
//     return { currImgExitClass, nextImageEntryClass };
//   }

//   // Previous Button
//   if (currIndex > nextIndex) {
//     currImgExitClass = "image-carousel__image--displaced-right";
//     nextImageEntryClass = "image-carousel__image--displaced-left";
//     return { currImgExitClass, nextImageEntryClass };
//   }

//   return { currImgExitClass, nextImageEntryClass };
// };

const shouldTransitionToLeftDirection = (
  currIndex: number,
  nextIndex: number,
  totalImages: number
) => {
  // forward transition -> next button
  if (currIndex === totalImages - 1 && nextIndex === 0) return true;

  // backward transition -> previous button
  if (currIndex === 0 && nextIndex === totalImages - 1) return false;

  return currIndex < nextIndex;
};
