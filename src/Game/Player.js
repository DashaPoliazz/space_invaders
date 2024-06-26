const WIDTH = 100;
const HEIGHT = 100;
const SPEED = -1;

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
    this.x += this.speed;
  }
}

export default Player;
