<details>
<summary>Animations trigger</summary>

```js
// get canvas position
let canvasPosition = canvas.getBoundingClientRect();
```

```js
// !! Check if width / height are the same as the css canvas width / height
canvas.width = 700;
canvas.height = 500;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

window.addEventListener("click", (e) => {
    // console.log("e.x: ", e.x, e.y);
    // console.log("cPos: ", canvasPosition.left);
    // console.log("cWid: ", canvasPosition.width);
    // console.log("cX Max: ", canvasPosition.width + canvasPosition.left);
    // console.log("e.x - c.x :", e.x - canvasPosition.left);
    // console.log("-------------");
    ctx.fillStyle = "white";
    ctx.fillRect(
        e.x - canvasPosition.left - 25,
        e.y - canvasPosition.top - 25,
        50,
        50
    );
});
```

</details>
