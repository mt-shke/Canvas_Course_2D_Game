<details>
<summary>Simple 2D game</summary>

```js
// create input handler

// create player class, add style and input handler + player controls & movements
// set player movements according to onGround

// set enemy and player collision

// set game logic

// add mobile responsive && mobile controls : event ("touchstart", "touchmove",touchend")

// add accurate collision detection
```

</details>
<details>
<summary>Mobile</summary>

```js
this.touchY = "";
this.touchTreshold = 30;

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
    )
        this.keys.push("swipe down");
});
window.addEventListener("touchend", (e) => {
    console.log(this.keys);
    this.keys.splice(this.keys.indexOf("swipe up"), 1);
    this.keys.splice(this.keys.indexOf("swipe down"), 1);
});
```

document.fullscreen method

```js
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
            alert("Error, cannot enable fullscreen mode", err.message);
        });
    } else {
        document.exitFullscreen();
    }
};
```

```css
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: black;
}

#canvas1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid white;
    max-width: 100%;
    max-height: 100%;
}
```

</details>
