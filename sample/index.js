const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 700;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
