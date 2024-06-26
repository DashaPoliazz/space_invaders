const WIDTH = 100;
const HEIGHT = 100;
const SPEED = 1;
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";

class Player {
  constructor(game) {
    this.game = game;
    this.width = WIDTH;
    this.height = HEIGHT;

    // centering player
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;

    this.speed = SPEED;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    // if (this.game.keys.has(ARROW_UP_KEY)) this.y -= this.speed;
    // if (this.game.keys.has(ARROW_DOWN_KEY)) this.y += this.speed;
    // horizontal movements
    if (this.game.keys.has(ARROW_LEFT_KEY)) this.x -= this.speed;
    if (this.game.keys.has(ARROW_RIGHT_KEY)) this.x += this.speed;
    // keeping inside the canvas bounds
    if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    if (this.x > this.game.width - this.width * 0.5)
      this.x = this.game.width - this.width * 0.5;
  }
  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
  }
}

export default Player;
