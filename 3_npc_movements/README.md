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
