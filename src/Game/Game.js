import Player from "./Player.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.player = new Player(this);

    this.keys = new Set();

    window.addEventListener("keydown", ({ key }) => {
      this.keys.add(key);
    });

    window.addEventListener("keyup", ({ key }) => {
      this.keys.delete(key);
    });
  }

  render(context) {
    this.player.draw(context);
    this.player.update();
  }
}

export default Game;
