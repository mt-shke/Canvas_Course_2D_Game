import { CollisionAnimation } from "./collisionAnimation.js";
import FloatingMessage from "./floatingMessages.js";
import {
    Diving,
    Falling,
    Hit,
    Jumping,
    Rolling,
    Running,
    Sitting,
} from "./playerStates.js";

export default class Player {
    constructor(game) {
        this.image = player;
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        // handle player movement
        this.speed = 0;
        this.maxSpeed = 10;
        // handle vertical movement
        this.vy = 0;
        this.weight = 1;
        // handle frame
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 5;
        this.fps = 30;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        // handle state
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new Hit(this.game),
        ];
        this.currentState = null;
    }

    update(input, deltaTime) {
        this.checkCollision();
        // INPUT Handler
        this.currentState.handleInput(input);

        // HORIZONTAL Movement
        this.x += this.speed;
        if (
            input.includes("ArrowRight") &&
            this.currentState !== this.states[6]
        )
            this.speed = this.maxSpeed;
        else if (
            input.includes("ArrowLeft") &&
            this.currentState !== this.states[6]
        )
            this.speed = -this.maxSpeed;
        else this.speed = 0;

        // LOCK Player in canvas - Horizontal boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width)
            this.x = this.game.width - this.width;

        // VERTICAL Movement
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        //  Horizontal boundaries
        if (this.y > this.game.height - this.height - this.game.groundMargin)
            this.y = this.game.height - this.height - this.game.groundMargin;

        // SPRITE Animation
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) ++this.frameX;
            else this.frameX = 0;

            this.frameTimer = 0;
        } else this.frameTimer += deltaTime;
    }
    draw(context) {
        // context.fillStyle = "red";
        // context.fillRect(this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.strokeStyle = "white";
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    setState(state, speed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    onGround() {
        return (
            this.y >= this.game.height - this.height - this.game.groundMargin
        );
    }

    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                // collision
                this.game.collisions.push(
                    new CollisionAnimation(
                        this.game,
                        enemy.x + enemy.width * 0.5,
                        enemy.y + enemy.height * 0.5
                    )
                );

                enemy.markedForDeletion = true;

                if (
                    this.currentState === this.states[4] ||
                    this.currentState === this.states[5]
                ) {
                    ++this.game.score;
                    this.game.floatingMessages.push(
                        new FloatingMessage("+1", enemy.x, enemy.y, 150, 50)
                    );
                } else {
                    this.setState(6, 0);
                    --this.game.lives;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
            }
        });
    }
}
