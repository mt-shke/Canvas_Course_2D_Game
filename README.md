## I - DrawImage

<details>
<summary>Basic frames</summary>

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

## II - Parallax background

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

## III - NPC Movements

<details>
<summary>Enemies Pattern</summary>

<details>
<summary>Enemy One</summary>

```js
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "enemy1.png";

        // this.speed = Math.random() * 4 - 2;
        this.spriteWith = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWith / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 4 + 1);
    }
    update() {
        // this.x += this.speed;
        // this.y += this.speed;
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? (this.frame = 0) : this.frame++;
        }
    }

    draw() {
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWith,
            0,
            this.spriteWith,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

const ennemiesArray = new Array(10).fill(1).map((elem) => new Enemy());

// const ennemiesArray = [];
// for (let index = 0; index < 5; index++) {
//     ennemiesArray.push(new Enemy());
// }

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ennemiesArray.forEach((enemy) => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
};

animate();
```

</details>

<details>
<summary>Flappy ennemy</summary>

```js
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "enemy2.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWith = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWith / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 4 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }
    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? (this.frame = 0) : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWith,
            0,
            this.spriteWith,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
```

</details>

<details>
<summary>Elliptic ennemy</summary>

```js
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "enemy3.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWith = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWith / 2.5;
        this.height = this.spriteHeight / 2.5;

        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 4 + 1);
        this.angle = 0;
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50;
    }
    update() {
        // change 90 & 270 values to get different pattern
        this.x =
            (canvas.width / 2) * Math.sin((this.angle * Math.PI) / 90) +
            canvas.width / 2 -
            this.width / 2;
        this.y =
            (canvas.height / 2) * Math.cos((this.angle * Math.PI) / 270) +
            canvas.height / 2 -
            this.height / 2;
        // this.y =
        //     this.curve * Math.cos((this.angle * Math.PI) / 180) +
        //     canvas.height / 2 -
        //     this.height / 2;
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? (this.frame = 0) : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWith,
            0,
            this.spriteWith,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
```

</details>

<details>
<summary>Rollerblade enemy</summary>

```js
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = "enemy4.png";
        this.speed = Math.random() * 4 + 1;
        this.spriteWith = 213;
        this.spriteHeight = 213;
        this.width = this.spriteWith / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 4 + 1);
        // set enemy to move at thier own rythm
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        if (gameFrame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;

        this.x -= dx / 70;
        this.y -= dy / 70;
        // this.x = 0;
        // this.y = 0;
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? (this.frame = 0) : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWith,
            0,
            this.spriteWith,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
```

</details>

</details>

## IV - Collision

<details>
<summary>Handling collision</summary>

Rectangle

```js
const rect1 = { x: 20, y: 20, width: 300, height: 300 };
const rect2 = { x: 80, y: 20, width: 200, height: 300 };

if (
    rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y
) {
    //no  collision
} else {
    // no collision
}
```

Circle

```js
const circle1 = { x: 20, y: 20, radius: 300 };
const circle2 = { x: 450, y: 450, radius: 200 };

let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;
let distance = Math.sqrt(dx * dx + dy * dy);
let sumOfRadius = circle1.radius + circle2.radius;

if (distance <= sumOfRadius) {
    // collision
} else (distance === sumOfRadius) {
    // touch
} else {
    // no collision
}

```

</details>
