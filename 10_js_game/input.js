export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.gameKeys = [
            "ArrowDown",
            "ArrowUp",
            "ArrowLeft",
            "ArrowRight",
            "Enter",
        ];
        // Push pressed key on keydown
        window.addEventListener("keydown", (e) => {
            if (
                (e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "Enter") &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key);
            } else if (e.key === "d") this.game.debug = !this.game.debug;
        });

        // Remove pressed key on keyup
        window.addEventListener("keyup", (e) => {
            if (
                e.key === "ArrowDown" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === "Enter"
            ) {
                this.keys.splice(this.keys[this.keys.indexOf(e.key)], 1);
            }
        });
    }
}
