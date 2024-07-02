import BigLaser from "./Lasers/BigLaser.js";
import SmallLaser from "./Lasers/SmallLaser.js";

const WIDTH = 140;
const HEIGHT = 120;
const SPEED = 5;
const ARROW_LEFT_KEY = "ArrowLeft";
const ARROW_RIGHT_KEY = "ArrowRight";
const ARROW_UP_KEY = "ArrowUp";
const ARROW_DOWN_KEY = "ArrowDown";
const SPACE_KEY = "Space";
const ENTER_KEY = "Enter";
const SMALL_LASER_ATTACK_KEY = "1";
const BIG_LASER_ATTACK_KEY = "2";
const LIVES = 3;
const MAX_LIVES = 10;

class Player {
  constructor(game) {
    this.game = game;
    this.width = WIDTH;
    this.height = HEIGHT;

    // centering player
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;

    this.speed = SPEED;
    this.lives = LIVES;
    this.maxLives = MAX_LIVES;

    this.image = document.getElementById("player");
    this.jetsImage = document.getElementById("player_jets");
    this.frameX = 0;
    this.jetsFrame = 1;

    // lasers
    this.smallLaser = new SmallLaser(this.game);
    this.bigLaser = new BigLaser(this.game);
  }

  draw(context) {
    if (this.game.keys.has(ENTER_KEY)) {
      this.frameX = 1;
    } else if (this.game.keys.has(SMALL_LASER_ATTACK_KEY)) {
      this.frameX = 2;
      this.smallLaser.render(context);
    } else if (this.game.keys.has(BIG_LASER_ATTACK_KEY)) {
      this.frameX = 3;
      this.bigLaser.render(context);
    } else {
      this.frameX = 0;
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    context.drawImage(
      this.jetsImage,
      this.jetsFrame * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  update() {
    // if (this.game.keys.has(ARROW_UP_KEY)) this.y -= this.speed;
    // if (this.game.keys.has(ARROW_DOWN_KEY)) this.y += this.speed;
    // horizontal movements
    if (this.game.keys.has(ARROW_LEFT_KEY)) {
      this.jetsFrame = 0;
      this.x -= this.speed;
    } else if (this.game.keys.has(ARROW_RIGHT_KEY)) {
      this.jetsFrame = 2;
      this.x += this.speed;
    } else {
      this.jetsFrame = 1;
    }
    // keeping inside the canvas bounds
    if (this.x < -this.width * 0.5) this.x = -this.width * 0.5;
    if (this.x > this.game.width - this.width * 0.5)
      this.x = this.game.width - this.width * 0.5;
  }
  shoot() {
    const projectile = this.game.getProjectile();
    if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
  }
  restart() {
    // centering player
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height - this.height;

    this.lives = LIVES;
  }
}

export default Player;
