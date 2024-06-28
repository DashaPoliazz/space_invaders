import Game from "./Game/Game.js";

const WIDTH = 600;
const HEIGHT = 800;

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  // everything that will drawn on canvas will be white
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.font = "30px Impact";

  const game = new Game(canvas);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
