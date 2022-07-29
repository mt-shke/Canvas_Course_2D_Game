<details>
<summary>Canvas.getContext("2d")</summary>

```js
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Reset - Clear canvas
ctx.fillRect(50, 50, 200, 200); // Draw - Clear canvas
```

ctx.drawImage();

```js
ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
```

requestAnimationFrame(animate);

```js
requestAnimationFrame(animate);

// tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
```

```js
let x = 0;
const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillRect(x, 50, 100, 100);
    x++;
    requestAnimationFrame(animate);
};

animate();
```

simple frame

```js
let frameX = 0;
let frameY = 4;
let gameFrame = 0;
const staggerFrames = 0;

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
        playerImage,
        frameX * spriteWidth,
        frameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );

    if (gameFrame % staggerFrames == 0) {
        if (frameX < 6) frameX++;
        else frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
};
```

</details>
