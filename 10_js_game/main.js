import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 82;
            // Game Speed
            this.speed = 0;
            this.maxSpeed = 3;
            // Debug mode
            this.debug = true;
            // Enemies
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

            // UI Score
            this.score = 0;
            // Game mechanics
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);

            // Particles
            this.particles = [];
            this.maxParticles = 100;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();

            // Player collision
            this.collisions = [];
        }
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else this.enemyTimer += deltaTime;

            this.enemies.forEach((enemy) => {
                if (enemy.markedForDeletion)
                    this.enemies.splice(this.enemies.indexOf(enemy), 1);
                enemy.update(deltaTime);
            });

            // Handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) {
                    this.particles.splice(index, 1);
                }
            });

            if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
            }

            // Handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                if (collision.markedForDeletion) {
                    this.collisions = this.collisions.splice(index, 1);
                    // this.collisions = this.collisions.filter(
                    //     (col) => !col[index]
                    // );
                }
            });

            console.log(this.collisions);
        }
        draw(context) {
            this.background.draw(context);
            this.enemies.forEach((enemy) => enemy.draw(context));
            this.collisions.forEach((collision) => collision.draw(context));
            this.player.draw(context);
            this.particles.forEach((particle) => particle.draw(context));
            this.UI.draw(context);
        }
        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5)
                this.enemies.push(new GroundEnemy(this));
            else this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    const animate = (timestamp) => {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);

        requestAnimationFrame(animate);
    };
    animate(0);
});
