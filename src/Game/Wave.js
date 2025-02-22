import Beetlemorph from "./Enemies/Beetlemorph.js";
import Eaglemorph from "./Enemies/Eaglemorph.js";
import Rhinomorph from "./Enemies/Rhinomorph.js";
import Squidmorph from "./Enemies/squidmorph.js";

const SPEED_X = 1;
const SPEED_Y = 0;
const MOTION_PATTERN = 5;

class Wave {
  constructor(game) {
    this.game = game;

    this.width = game.columns * game.enemySize;
    this.height = game.rows * game.enemySize;

    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = -this.height;

    this.speedX = Math.random() < 0.5 ? -SPEED_X : SPEED_X;
    this.speedY = SPEED_Y;

    this.enemies = [];
    this.nextWaveTriggered = false;
    this.markedForDeletion = false;
    this.create();
  }
  render(context) {
    // motion pattern
    if (this.y < 0) this.y += MOTION_PATTERN;

    this.speedY = 0;
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
      this.speedY = this.game.enemySize;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    // rendering enemies
    this.enemies.forEach((enemy) => {
      enemy.update(this.x, this.y);
      enemy.draw(context);
    });
    this.enemies = this.enemies.filter((object) => !object.markedForDeletion);
    // Marking wave as wave for deletion
    if (this.enemies.length <= 0) {
      this.markedForDeletion = true;
    }
  }
  create() {
    for (let y = 0; y < this.game.rows; y++) {
      for (let x = 0; x < this.game.columns; x++) {
        const enemyX = x * this.game.enemySize;
        const enemyY = y * this.game.enemySize;
        const probability = Math.random();
        if (probability < 0.25) {
          this.enemies.push(new Squidmorph(this.game, enemyX, enemyY));
        } else if (probability < 0.5) {
          this.enemies.push(new Rhinomorph(this.game, enemyX, enemyY));
        } else if (probability < 0.7) {
          this.enemies.push(new Eaglemorph(this.game, enemyX, enemyY));
        } else {
          this.enemies.push(new Beetlemorph(this.game, enemyX, enemyY));
        }
      }
    }
  }
}

export default Wave;
