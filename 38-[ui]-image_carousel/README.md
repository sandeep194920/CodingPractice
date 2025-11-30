## [Image Carousel](https://www.greatfrontend.com/questions/user-interface/image-carousel/react?framework=react&tab=coding)

`Approx time - 15 minutes`

### High level steps

1. Make a high level wrapper and give it a width and height of 100vw and vh repectively. Height is also needed as you can add flex to this and then justify and align items to center.

2. In order to not see the slight margins at the page borders, do add `box-sizing:border-box` and also `margin:0` (**_this is very important and might forget occassionally - hard to debug this margin so remember this!_**)

3. Make a container called `image-carousel` - make this relative. Under this, you can add 2 buttons left and right which are absolutely positioned. Then center them vertically.
   **Note, since we applied `position:absolute` on the buttons, we can't use align-items or justify-center or display-flex. Hence we use the following to center the button vertically**

```css
top: 50%;
tranform: translateY(
  -50%
); /* This would adjust origin of the button to center so it centers perfectly */
```

4. Make another container for dots, called `image-carousel__pages` and `image-carousel__pages__button` for each button inside it. Make this `position:absolute` and center it horizontally. Do the following similar to what we did for the buttons above to center vertically (but this is horizontal).

```css
left: 50%;
tranform: translateX(
  -50%
); /* This would adjust origin of the button to center so it centers perfectly */
```

5. Use a state called `currIndex` and keep track of index. Derive the current image by the state like `images[currIndex]`. To set the state, for previous and next button we need it to be circular, so do this

```ts
// Previous button

setCurrIndex((prev) => (prev - 1 + totalImages) % totalImages);

// Next button

setCurrIndex((prev) => (prev + 1) % totalImages);
```

Remember this pattern always. To rotate from 0 to last and then from last to first we do this. If it's hard to remember, then remember to apply same rule for both like this where

add `(prev - or + 1 totalImages)  % totalImages`

```ts
// Previous button

setCurrIndex((prev) => (prev - 1 + totalImages) % totalImages);

// Next button

setCurrIndex((prev) => (prev + 1 + totalImages) % totalImages); // still get the same result
```

**So again, remember `totalImages) % totalImages`**
