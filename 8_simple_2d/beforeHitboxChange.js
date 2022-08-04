window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1400;
    canvas.height = 720;

    const fullScreenBtn = document.getElementById("fullScreenButton");

    let enemies = [];
    let score = 0;
    let gameOver = false;

    class InputHandler {
        constructor() {
            this.keys = [];
            this.moveKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
            this.touchY = "";
            this.touchTreshold = 30;

            window.addEventListener("keydown", (e) => {
                if (
                    this.moveKeys.includes(e.key) &&
                    this.keys.indexOf(e.key) === -1
                ) {
                    this.keys.push(this.moveKeys[this.moveKeys.indexOf(e.key)]);
                } else if (e.key === "Enter" && gameOver) restartGame();
            });
            window.addEventListener("keyup", (e) => {
                if (this.keys.includes(e.key)) {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });

            // mobile
            window.addEventListener("touchstart", (e) => {
                this.touchY = e.changedTouches[0].pageY;
            });
            window.addEventListener("touchmove", (e) => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;

                if (
                    swipeDistance < -this.touchTreshold &&
                    this.keys.indexOf("swipe up") === -1
                )
                    this.keys.push("swipe up");
                else if (
                    swipeDistance > this.touchTreshold &&
                    this.keys.indexOf("swipe down") === -1
                ) {
                    this.keys.push("swipe down");

                    if (gameOver) {
                        restartGame();
                    }
                }
            });
            window.addEventListener("touchend", (e) => {
                this.keys.splice(this.keys.indexOf("swipe up"), 1);
                this.keys.splice(this.keys.indexOf("swipe down"), 1);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = playerImage;
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
        }
        restart() {
            this.x = 100;
            this.y = this.gameHeight - this.height;
            this.maxFrame = 8;
            this.frameY = 0;
        }
        update(input, deltaTime, enemies) {
            // collision detection
            enemies.forEach((enemy) => {
                const dx =
                    enemy.x + enemy.width * 0.5 - (this.x + this.width * 0.5);
                const dy =
                    enemy.y + enemy.height * 0.5 - (this.y + this.width * 0.5);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < enemy.width * 0.5 + this.width * 0.5) {
                    gameOver = true;
                }
            });

            // sprite animation
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else ++this.frameX;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }

            // handling controls
            if (input.keys.indexOf("ArrowRight") > -1) {
                this.speed = 5;
            } else if (input.keys.indexOf("ArrowLeft") > -1) {
                this.speed = -5;
            } else if (
                input.keys.indexOf("ArrowUp") > -1 ||
                (input.keys.indexOf("swipe up") > -1 && this.onGround())
            ) {
                this.vy -= 30;
            } else {
                this.speed = 0;
            }
            // horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width)
                this.x = this.gameWidth - this.width;

            // vertical movement
            this.y += this.vy;

            if (!this.onGround()) {
                this.vy += this.weight;
                this.frameY = 1;
                this.maxFrame = 5;
            } else {
                this.vy = 0;
                this.frameY = 0;
                this.maxFrame = 8;
            }

            if (this.y > this.gameHeight - this.height)
                this.y = this.gameHeight - this.height;
        }

        onGround() {
            return this.y >= this.gameHeight - this.height;
        }

        draw(ctx) {
            // ctx.strokeStyle = "white";
            // ctx.strokeRect(this.x, this.y, this.width, this.height);
            // ctx.beginPath();
            // ctx.arc(
            //     this.x + this.width * 0.5,
            //     this.y + this.height * 0.5,
            //     this.width * 0.5,
            //     0,
            //     Math.PI * 2
            // );
            // ctx.stroke();
            ctx.drawImage(
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
    }

    class Background {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = backgroundImage;
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 10;
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(
                this.image,
                this.x + this.width - this.speed,
                this.y,
                this.width,
                this.height
            );
        }
        restart() {
            this.x = 0;
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = enemyImage;
            this.width = 160;
            this.height = 119;
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 8;
            this.markedForDeletion = false;
        }

        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else ++this.frameX;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }
        }
        draw(ctx) {
            // ctx.strokeStyle = "white";
            // ctx.strokeRect(this.x, this.y, this.width, this.height);
            // ctx.beginPath();
            // ctx.arc(
            //     this.x + this.width * 0.5,
            //     this.y + this.height * 0.5,
            //     this.width * 0.5,
            //     0,
            //     Math.PI * 2
            // );
            // ctx.stroke();
            ctx.drawImage(
                this.image,
                this.frameX * this.width,
                0,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    const handleEnemies = (deltaTime) => {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else enemyTimer += deltaTime;

        enemies = enemies.filter((enemy) => !enemy.markedForDeletion);

        enemies.forEach((enemy) => {
            enemy.update(deltaTime);
            enemy.draw(ctx);
        });
    };

    const displayStatusText = (ctx) => {
        ctx.fillStyle = "black";
        ctx.font = "40px Helvetica";
        ctx.fillText("Score :" + score, 100, 100);

        if (gameOver) {
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(
                "GAME OVER, press Enter or swipe down to restart",
                canvas.width * 0.5,
                200
            );
            ctx.fillStyle = "white";
            ctx.fillText(
                "GAME OVER, press Enter or swipe down to restart",
                canvas.width * 0.5 + 2,
                200 + 2
            );
        }
    };

    const restartGame = () => {
        player.restart();
        background.restart();
        enemies = [];
        score = 0;
        gameOver = false;
        animate(0);
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().catch((err) => {
                alert("Error, cannot enable fullscreen mode", err.message);
            });
        } else {
            document.exitFullscreen();
        }
    };

    fullScreenBtn.addEventListener("click", () => toggleFullScreen());

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    const animate = (timestamp) => {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);

        if (!gameOver) {
            requestAnimationFrame(animate);
        }
    };

    animate(0);
});
