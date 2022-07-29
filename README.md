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
<details>
<summary>Parallax background using canvas</summary>

```js
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 20;

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.image = image;
        this.speedModifier = speedModifier;

        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        if (this.x <= -this.width) this.x = 0;
        this.x = Math.floor(this.x - gameSpeed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.x + this.width,
            this.y,
            this.width,
            this.height
        );
    }
}

const layer1 = new Layer(backgroundLayer1, 0.05);
const layer2 = new Layer(backgroundLayer2, 0.07);
const layer3 = new Layer(backgroundLayer3, 0.1);
const layer4 = new Layer(backgroundLayer4, 0.2);
const layer5 = new Layer(backgroundLayer5, 0.3);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((layer) => {
        layer.update();
        layer.draw();
    });

    gameFrame++;
    requestAnimationFrame(animate);
};

animate();
```

</details>
