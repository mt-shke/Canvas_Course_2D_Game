export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = boom;
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.sizeModifier = Math.random() * 0.5 + 1;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x;
        this.y = y;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = 10;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }
    draw(context) {
        context.drawImage(
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
    update(deltaTime) {
        this.x -= this.game.speed;

        if (this.frameTimer > this.frameInterval) {
            ++this.frameX;
            if (this.frameX >= this.maxFrame) this.markedForDeletion = true;
            this.frameTimer = 0;
        } else this.frameTimer += deltaTime;
    }
}