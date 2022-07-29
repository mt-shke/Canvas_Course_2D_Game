const canvas = document.getElementById("canvas1");
const slider = document.getElementById("slider");
const ctx = canvas.getContext("2d");

const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "layer-5.png";

window.addEventListener("load", () => {
    const CANVAS_WIDTH = (canvas.width = 800);
    const CANVAS_HEIGHT = (canvas.height = 700);

    let gameFrame = 0;
    let gameSpeed = 10;
    const showGameSpeed = document.getElementById("showGameSpeed");
    showGameSpeed.innerHTML = gameSpeed;

    slider.addEventListener("change", (e) => {
        gameSpeed = e.target.value;

        showGameSpeed.innerHTML = gameSpeed;
    });

    let x = 0;
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
});
