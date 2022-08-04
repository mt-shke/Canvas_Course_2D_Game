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

## V - Playing Animation

<details>
<summary>Animations trigger</summary>

<details>
<summary>Click</summary>

click animation

```js
class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
    }

    update() {
        ++this.timer;
        if (this.timer % 5 === 0) {
            ++this.frame;
        }
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

window.addEventListener("click", (e) => {
    createAnimation(e);
});

const createAnimation = (e) => {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < explosions.length; ++index) {
        explosions[index].update();
        explosions[index].draw();
        if (explosions[index].frame > 5) {
            explosions.splice(index, 1);
            --index;
        }
    }
    requestAnimationFrame(animate);
};

animate();
```

</details>

<details>
<summary>Mousemove</summary>

```js
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio();
        this.sound.src = "boom.wav";
    }

    update() {
        if (this.frame === 0) this.sound.play();
        ++this.timer;
        if (this.timer % 10 === 0) {
            ++this.frame;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.image,
            this.spriteWidth * this.frame,
            0,
            this.spriteWidth,
            this.spriteHeight,
            0 - this.width / 2,
            0 - this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
}

window.addEventListener("click", (e) => {
    createAnimation(e);
});
// window.addEventListener("mousemove", (e) => {
//     createAnimation(e);
// });

const createAnimation = (e) => {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < explosions.length; ++index) {
        explosions[index].update();
        explosions[index].draw();
        if (explosions[index].frame > 5) {
            explosions.splice(index, 1);
            --index;
        }
    }
    requestAnimationFrame(animate);
};

animate();
```

</details>

```js
// get canvas position
let canvasPosition = canvas.getBoundingClientRect();
```

```js
// !! Check if width / height are the same as the css canvas width / height
canvas.width = 700;
canvas.height = 500;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener("click", (e) => {
    ctx.fillStyle = "white";
    ctx.fillRect(
        e.x - canvasPosition.left - 25,
        e.y - canvasPosition.top - 25,
        50,
        50
    );
});
```

</details>

## VI - Double Canvas, trigger animation

<details>
<summary>Handling animated image</summary>

```js
// deltaTime

// handle visible/unvisible ennemiesArray

// handle animated image regarding deltaTime

// handle animated image directionY, and avoid ennemies escaping from canvas

// handle score

// ctx.getImageData(e.x,e.y,1,1)
// Scan pixel, return array of color

// create second layer, set unique fillRect color to each ennemy and set color compare function, to get focused ennemy

// add explosions animation to hitten ennemy

// add gameOver logic, display score

// add particules animation
```

```js
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext("2d");
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

ctx.font = "50px Impact";
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;
let score = 0;

let gameOver = false;

// RAVENS
let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spritHeight = 194;
        this.sizeModifier = Math.random() * 0.6 + 0.2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spritHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "raven.png";
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = 120;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        ];
        this.color =
            "rgb(" +
            this.randomColors[0] +
            "," +
            this.randomColors[1] +
            "," +
            this.randomColors[2] +
            ")";

        this.hasTrail = Math.random() > 0.5;
    }
    update(deltaTime) {
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }

        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;

        this.timeSinceFlap += deltaTime;

        if (this.timeSinceFlap > this.flapInterval) {
            if (this.frame > this.maxFrame) this.frame = 0;
            else ++this.frame;
            this.timeSinceFlap = 0;
            if (this.hasTrail) {
                for (let index = 0; index < 5; index++) {
                    particles.push(
                        new Particles(this.x, this.y, this.width, this.color)
                    );
                }
            }
        }

        if (this.x < 0 - this.width) gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spritHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

// EXPLOSIONS
let explosions = [];
class Explosions {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = "boom.png";
        this.spriteWidth = 200;
        this.spritHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = "impact.wav";
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }
    update(deltaTime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            ++this.frame;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        ctx.drawImage(
            this.image,
            this.frame * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spritHeight,
            this.x - this.spriteWidth * 0.5,
            this.y - this.spritHeight * 0.5,
            this.size,
            this.size
        );
    }
}

// PARTICLES
let particles = [];
class Particles {
    constructor(x, y, size, color) {
        this.size = size;
        this.x = x + this.size * 0.5 + Math.random() * 50 - 25;
        this.y = y + this.size * 0.5 + Math.random() * 50 - 25;
        this.radius = (Math.random() * this.size) / 10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.radius += 0.3;
        if (this.radius > this.maxRadius) this.markedForDeletion = true;
    }

    draw() {
        ctx.save(); // usefull to rotate for example, fix canvas settings
        ctx.globalAlpha = 1 - this.radius / this.maxRadius; // change opacity
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // usefull to rotate for example
    }
}

const drawScore = () => {
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 50, 75);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 55, 80);
};

window.addEventListener("click", (e) => {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = [...detectPixelColor.data].slice(0, -1);

    ravens.forEach((raven) => {
        if (pc.toString() === raven.randomColors.toString()) {
            raven.markedForDeletion = true;
            ++score;
            explosions.push(new Explosions(e.x, e.y, raven.width));
            console.log(explosions);
        }
    });
});

const drawGameOver = () => {
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
        "GAME OVER, your score is " + score,
        canvas.width * 0.5,
        canvas.height * 0.5
    );
    ctx.fillStyle = "white";
    ctx.fillText(
        "GAME OVER, your score is " + score,
        canvas.width * 0.5 + 5,
        canvas.height * 0.5 + 5
    );
};

const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltaTime;

    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;

        ravens.sort((a, b) => a.width - b.width);
    }
    drawScore();
    [...particles, ...ravens, ...explosions].forEach((object) =>
        object.update(deltaTime)
    );
    [...particles, ...ravens, ...explosions].forEach((object) => object.draw());

    ravens = ravens.filter((object) => !object.markedForDeletion);
    explosions = explosions.filter((object) => !object.markedForDeletion);
    particles = particles.filter((object) => !object.markedForDeletion);

    if (!gameOver) {
        requestAnimationFrame(animate);
        return;
    }
    drawGameOver();
};

animate(0);
```

</details>

## VII - Class extends - ctx.methods()

<details>
<summary>Class extends - ctx methods</summary>

<details>
<summary>DeltaTime</summary>

deltaTime

```js
let lastTime = 1;
const animate = (timestamp) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    requestAnimationFrame(animate);
    // => pass automatic timestamp feature
};
animate(0);
```

</details>

<details>
<summary>Super method - extends - ctx.save/restore</summary>

```js
// GAME
class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 500;
        this.enemyTimer = 0;
        this.enemyTypes = ["worm", "ghost", "spider"];
        this.#addNewEnemy();
    }
    update(deltaTime) {
        if (this.enemyTimer > this.enemyInterval) {
            this.#addNewEnemy();
            this.enemyTimer = 0;
        } else this.enemyTimer += deltaTime;

        this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
        this.enemies.forEach((enemy) => enemy.update(deltaTime));
    }
    draw() {
        this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }
    // # => private, can only be called inside this class scope
    #addNewEnemy() {
        const randomEnemy =
            this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if (randomEnemy === "worm") {
            this.enemies.push(new Worm(this));
        } else if (randomEnemy === "ghost") {
            this.enemies.push(new Ghost(this));
        } else {
            this.enemies.push(new Spider(this));
        }
        // this.enemies.sort((a, b) => {
        //     a.y - b.y;
        // });
    }
}

// ENEMY
class Enemy {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.maxFrame = 5;
        this.frameInterval = 100;
        this.frameTimer = 0;
    }
    update(deltaTime) {
        this.x -= this.vx * deltaTime;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) {
                ++this.frameX;
            } else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

class Worm extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = this.game.width;
        this.y = this.game.height - this.height;
        this.image = worm;
        this.vx = Math.random() * 0.1 + 0.2;
    }
}

class Ghost extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.6;
        this.image = ghost;
        this.vx = Math.random() * 0.2 + 0.2;
        this.angle = 0;
        this.curve = Math.random() * 3;
    }
    update(deltaTime) {
        super.update(deltaTime);
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.05;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.7;
        super.draw(ctx);
        ctx.restore();
    }
}

class Spider extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = 0 + Math.random() * this.game.width;
        this.y = 0 - this.height;
        this.image = spider;
        this.vx = 0;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLength = Math.random() * this.game.height;
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y < 0 - this.height * 2) this.markedForDeletion = true;

        this.y += this.vy * deltaTime;
        if (this.y > this.maxLength) {
            this.vy *= -1;
        }
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 0.5, 0);
        ctx.lineTo(this.x + this.width * 0.5, this.y);
        ctx.stroke();
        super.draw(ctx);
    }
}
```

</details>

</details>
