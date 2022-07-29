<details>
<summary>Parallax background using canvas</summary>

```js
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);
let gameSpeed = 20;

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

let x = 0;
let x2 = 2400;

const animate = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4, x, 0);
    ctx.drawImage(backgroundLayer4, x2, 0);

    console.log("x is:" + x);
    console.log("x2 is:" + x2);

    if (x < -2400) x = x2 + 2400 - gameSpeed;
    else x -= gameSpeed;
    if (x2 < -2400) x2 = x + 2400 - gameSpeed;
    else x2 -= gameSpeed;

    // requestAnimationFrame(animate);
};

animate();
```

</details>
