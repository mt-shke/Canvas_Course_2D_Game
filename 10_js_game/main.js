import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy.js";
import InputHandler from "./input.js";
import Player from "./player.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            // Game Speed
            this.speed = 0;
            this.maxSpeed = 3;
            // Debug mode
            this.debug = false;
            // Enemies
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            // Player collision
            this.collisions = [];
            // UI Score
            this.score = 0;
            this.fontColor = "black";
            // Game mechanics
            this.time = 0;
            this.maxTime = 20000;
            this.lives = 5;
            this.gameOver = false;
            this.floatingMessages = [];
            this.winningScore = 30;
            // Game Class
            this.player = new Player(this);
            this.background = new Background(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);

            // Particles
            this.particles = [];
            this.maxParticles = 100;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);

            // Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else this.enemyTimer += deltaTime;

            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
            });

            // Handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // Handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            // Handle floating messages
            this.floatingMessages.forEach((message, index) => {
                message.update();
            });
            this.enemies = this.enemies.filter(
                (enemy) => !enemy.markedForDeletion
            );
            this.collisions = this.collisions.filter(
                (collision) => !collision.markedForDeletion
            );
            this.particles = this.particles.filter(
                (particle) => !particle.markedForDeletion
            );
            this.floatingMessages = this.floatingMessages.filter(
                (message) => !message.markedForDeletion
            );

            console.log(this.enemies);
            console.log(this.particles);
            console.log(this.collisions);
            console.log(this.floatingMessages);
        }
        draw(context) {
            this.background.draw(context);
            this.enemies.forEach((enemy) => enemy.draw(context));
            this.collisions.forEach((collision) => collision.draw(context));
            this.floatingMessages.forEach((message) => message.draw(context));
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

        if (!game.gameOver) {
            requestAnimationFrame(animate);
        }
    };
    animate(0);
});
