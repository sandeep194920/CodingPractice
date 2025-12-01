## [Image Carousel](https://www.greatfrontend.com/questions/user-interface/image-carousel/react?framework=react&tab=coding)

`Approx time - 20 minutes`

We can continue from where we left off in [Image_carousel-I](https://github.com/sandeep194920/CodingPractice/tree/main/38-%5Bui%5D-image_carousel)

### High level steps on how to continue from [Image_carousel_I](https://github.com/sandeep194920/CodingPractice/tree/main/38-%5Bui%5D-image_carousel)

There are a few things to learn here but the high level steps are as follows:

1. Place images side by side in the `image-carousel__row` container (we had one single image earlier, but now we made a div and map through images in `image-carousel__row` container under `image-carousel`), and then when the arrow is clicked, we update the `transform:translateX(imageIndex * imageSize)`

Say imageSize is `600px` _(more on this below)_

- For first image, `imageIndex = 0`, so `translateX` (move x axis) `0px`

- For image 2, `imageIndex = 1`, `translateX = 600px`

- For image 3, `imageIndex = 2`, `translateX = 1200px`

and so on. The translate moves visually and hence we see the image moving to next image.

2. Adding to the above step, we now have translateX moving our image, but we also need to animate. We can do it through CSS transition.

- We might not remember how to apply animation, but one easiest way to remember is, ANIMA**TION** = TRANSI**TION** (both has **tion**) at the end. This way you won't get confused as to which css property it is.

- transitions (animations) can be applied to any css property like `background`, `tranform` and so on.

Also, remember, we do `transform: translateX(value)` and then we can animate this by doing `tranition: transform 0.5 linear`

3. Now you have images side-by-side, but you need to display one single image, so you can do `overflow:hidden` on image-carousel continer and that would hide other images on sides.

```bash
commit 90418a74dbd93eb1666a4c7ae87770b54f7d774c (HEAD -> main, origin/main, origin/HEAD)
Author: Sandeepamarnath <57572394+sandeep194920@users.noreply.github.com>
Date:   Mon Dec 1 09:35:43 2025 -0500

    39 - image-carousel II - without optimizations
```

---
