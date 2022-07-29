<details>
<summary>Handling collision</summary>

Rectangle

```js
const rect1 = { x: 20, y: 20, width: 300, height: 300 };
const rect2 = { x: 80, y: 20, width: 200, height: 300 };

if (
    rect1.x > rect2.x + rect2.width ||
    rect1.x + rect1.width < rect2.x ||
    rect1.y > rect2.y + rect2.height ||
    rect1.y + rect1.height < rect2.y
) {
    //no  collision
} else {
    // no collision
}
```

Circle

```js
const circle1 = { x: 20, y: 20, radius: 300 };
const circle2 = { x: 450, y: 450, radius: 200 };

let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;
let distance = Math.sqrt(dx * dx + dy * dy);
let sumOfRadius = circle1.radius + circle2.radius;

if (distance <= sumOfRadius) {
    // collision
} else (distance === sumOfRadius) {
    // touch
} else {
    // no collision
}

```

</details>
