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
