import Game from "./Game/Game.js";

const WIDTH = 600;
const HEIGHT = 800;

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.widht = WIDTH;
  canvas.height = HEIGHT;

  const game = new Game(canvas);
  game.render(ctx);

  function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    game.render(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
