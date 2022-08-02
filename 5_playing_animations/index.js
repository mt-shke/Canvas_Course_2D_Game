const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 500;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

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
        console.log("timer is", this.timer);
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
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX, positionY));
    console.log(explosions);
});

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
