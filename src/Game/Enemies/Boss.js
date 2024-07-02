const BOSSES_VARIETY = 4;
const HEIGHT = 200;
const WIDTH = 200;
const SPEED = 1;
const LIVES = 10;
// Amount of states in the sprite
const MAX_FRAME = 11;

class Boss {
  constructor(game) {
    this.game = game;
    this.width = WIDTH;
    this.height = HEIGHT;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = -this.height;
    this.speedX = Math.random() < 0.5 ? -SPEED : SPEED;
    this.speedY = 0;
    this.lives = LIVES;
    this.maxLives = this.lives;
    this.markedForDeletion = false;
    this.image = document.getElementById("boss");
    this.frameX = 1;
    this.frameY = Math.floor(Math.random() * BOSSES_VARIETY);
    this.maxFrame = 11;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
    if (this.lives > 0) {
      context.save();
      context.textAlign = "center";
      context.shadowOffsetX = 3;
      context.shadowOffsetY = 3;
      context.shadowColor = "black";

      context.fillText(this.lives, this.x + this.width * 0.5, this.y + 50);
      context.restore();
    }
  }
  update() {
    this.speedY = 0;
    if (this.game.spriteUpdate && this.lives > 0) this.frameX = 0;
    if (this.y < 0) this.y += 4;
    if (this.x < 0 || this.x > this.game.width - this.width) {
      this.speedX *= -1;
      this.speedY = this.height * 0.5;
    }
    this.x += this.speedX;
    this.y += this.speedY;
    // collision detection boss/projectiles
    this.game.projectilesPool.forEach((projectile) => {
      if (
        this.game.checkCollision(this, projectile) &&
        !projectile.free &&
        this.lives > 0
      ) {
        this.hit(1);
        projectile.reset();
      }
    });
    // boss destroyed
    if (this.lives < 1 && this.game.spriteUpdate) {
      this.frameX++;
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;
        this.game.score += this.maxLives;
      }
    }
  }
  hit(damage) {
    this.lives -= damage;
    if (this.lives > 1) this.frameX = 1;
  }
}

export default Boss;
