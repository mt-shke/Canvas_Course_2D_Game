export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Creepster";
        this.livesImage = lives;
        this.heart = heart;
    }

    draw(context) {
        context.save();
        // text shadow - not optimized for firefox yet
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = "white";
        context.shadowBlur = 0;

        // Game score text
        context.font = this.fontSize + "px " + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        // Score
        context.fillText("Score: " + this.game.score, 20, 50);
        // Timer
        context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
        context.fillText(
            "Time: " + (this.game.time * 0.001).toFixed(1),
            20,
            80
        );

        // Lives

        for (let index = 0; index < this.game.lives; index++) {
            context.drawImage(this.livesImage, 25 + index * 25, 95, 25, 25);
        }
        // Game Over logic
        if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = this.fontSize * 2 + "px " + this.fontFamily;
            context.fillText(
                "Game Over",
                this.game.width * 0.5,
                this.game.height * 0.5
            );

            if (this.game.score > this.game.winningScore) {
                context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
                context.fillText(
                    "You won the game, congratulations",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            } else {
                context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
                context.fillText(
                    "You lose, try again! Thank you for playing",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            }
        }
        context.restore();
    }
}
