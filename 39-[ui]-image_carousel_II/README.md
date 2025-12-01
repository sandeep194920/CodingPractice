## [Image Carousel](https://www.greatfrontend.com/questions/user-interface/image-carousel/react?framework=react&tab=coding)

`Approx time - 20 minutes`

We can continue from where we left off in [Image_carousel-I](https://github.com/sandeep194920/CodingPractice/tree/main/38-%5Bui%5D-image_carousel)

### High level steps on how to continue from [Image_carousel_I](https://github.com/sandeep194920/CodingPractice/tree/main/38-%5Bui%5D-image_carousel)

There are a few things to learn here but the high level steps are as follows:

#### 1. Place images side by side in the `image-carousel__row` container (we had one single image earlier, but now we made a div and map through images in `image-carousel__row` container under `image-carousel`), and then when the arrow is clicked, we update the `transform:translateX(imageIndex * imageSize)`

Say imageSize is `600px` _(more on this below in ***point 4***)_

- For first image, `imageIndex = 0`, so `translateX` (move x axis) `0px`

- For image 2, `imageIndex = 1`, `translateX = 600px`

- For image 3, `imageIndex = 2`, `translateX = 1200px`

and so on. The translate moves visually and hence we see the image moving to next image.

#### 2. Adding to the above step, we now have translateX moving our image, but we also need to animate. We can do it through CSS transition.

- We might not remember how to apply animation, but one easiest way to remember is, ANIMA**TION** = TRANSI**TION** (both has **tion**) at the end. This way you won't get confused as to which css property it is.

- transitions (animations) can be applied to any css property like `background`, `tranform` and so on.

Also, remember, we do `transform: translateX(value)` and then we can animate this by doing `tranition: transform 0.5 linear`

#### 3. Now you have images side-by-side, but you need to display one single image, so you can do `overflow:hidden` on image-carousel continer and that would hide other images on sides.

```bash
commit 6f9556e52a3456e435a01c0bdf54d8bf031dba27 (HEAD -> main, origin/main, origin/HEAD)
Author: Sandeepamarnath <57572394+sandeep194920@users.noreply.github.com>
Date:   Mon Dec 1 09:35:43 2025 -0500

    39 - image-carousel II - without optimizations
```

I pushed a commit here that includes all the above basic steps needed. The image-carousel II works perfectly fine, but we need to address a few things here.

#### 4. Currently we have `image-carousel` (container) set to `width: min(600px, 100vw);`.

`100vw` means 100% of view port.

`width: min(600px, 100vw);` sets the width of an element to the smaller of two values: 600 pixels or 100% of the viewport width.

- 600px - A fixed width of 600px
- 100vw - 100% of view port

**_How it works?_**

`min(600px, 100vw);` -> Always chooses the minimum from the available.

**For Larger screens**

- The screen size available will be more than 600px (say for example a large screen will have 1200px total size horizontally). min of that screen is taken to be `600px` and the `image-carousel` will apply a width of `600px`

In simple words, for large screens greater than 600px, apply a width of `600px`. That's what it means.

**For smaller screens**

For smaller screens (probably on phone), the width is generally less than 600px. So say the screen width is 500px for small screens. Then the minimum between (600px, 100vw) is 100vw, so the small screen occupies 100% of view port.

**_Coming back to our case_**

So in our case, if we hardcode the screen size to be `600px`, then for smaller screens the image carousel will still be 600px which might cut-off the images (inside the container) or introduce a weird scroll behaviour. This happens when we resize the window.

So the point is, we need to have `imageWidth` as a state and should be tracked based on screen size and update it if window resizes.

**When we resize the window, the react component doesn't re-render by default to adapt to new size - that's the keypoint why we need to use the state value here and track that new imageWidth size**

---

### Things learnt

- Never use useEffect just to update the initial state.

```tsx
const [state, setState] = useState(false);

useEffect(() => {
  setState(true);
}, []);
```

This gives you a warning **Error: Calling setState synchronously within an effect can trigger cascading renders** and is not a good practice.

Even if you wrap this in any if-condition, it still yells at you, so remember this is an antipattern.

```tsx
useEffect(() => {
  if (images.length === 4) {
    setState(true);
  }
}, []);
```

But sometimes we might have to do this, or something similar to this. For example, we might have to set the image-width based on some calculation - like calculating the image size. We can use a function inside useEffect to update this.

In our case, we do this way

```tsx
useEffect(() => {
  // react complains if we define this outside and call updateImageSize() due to the fact I described above
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
```

The above code works perfectly fine - but one thing to note is the above useEff tracks the window resize everytime.

It would be better to just track the carousel resize, so we have an API which is more efficient to do that called ResizeObserver. We can modify above useEffect to this - but optional.

```tsx
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
```

this now tracks only when imageCarousel changes efficiently and not the whole window.

---

- We have a prop called `onTransitionEnd` that _fires when CSS transitions complete_. We use it to reset the `isTransitioning` state, which:

Re-enables navigation buttons after animation finishes
Prevents transition animation during window resize (we only apply transition class when user clicks navigation buttons)

- **Why we need `isTransitioning` state:**

When user clicks navigation buttons, we want smooth CSS transitions. But when window resizes, we don't want transitions (it looks weird).

Solution: Only apply the transition class conditionally when user navigates.

```tsx
const [isTransitioning, setIsTransitioning] = useState(false);

// On button click
const handleNext = () => {
  setIsTransitioning(true); // Enable transition
  setCurrIndex((prev) => (prev + 1) % totalImages);
};

// In JSX
<div
  className={clsx(
    "image-carousel__row",
    isTransitioning && "image-carousel__row--transitioning" // Only add when navigating
  )}
  onTransitionEnd={() => setIsTransitioning(false)} // Remove after animation
/>;
```

Also disable buttons during transition to prevent rapid clicks causing multiple transitions:

```tsx
<button
  onClick={handleNext}
  disabled={isTransitioning} // ← Prevent clicks during transition
>
```

---
