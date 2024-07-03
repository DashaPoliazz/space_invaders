const WIDTH = 50;
const HEIGHT = 35;
const HORIZONTAL_PROJECTILES = 4;
const VERTICAL_PROJECTILES = 2;

class EnemyProjectile {
  constructor(game) {
    this.game = game;

    this.width = WIDTH;
    this.height = HEIGHT;

    this.x = 0;
    this.y = 0;

    this.speed = Math.random() * 3 + 2;

    // When 'free' is false it means that we pulled it from the pool
    this.free = true;

    this.image = document.getElementById("enemyProjectile");
    this.frameX = Math.floor(Math.random() * HORIZONTAL_PROJECTILES);
    this.frameY = Math.floor(Math.random() * VERTICAL_PROJECTILES);
  }

  draw(context) {
    if (!this.free) {
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
    }
  }
  update() {
    if (!this.free) {
      this.y += this.speed;
      if (this.y > this.game.height) this.reset();
    }
  }
  start(x, y) {
    this.x = x - this.width * 0.5;

    this.y = y;
    this.free = false;
  }
  reset() {
    this.free = true;
  }
}

export default EnemyProjectile;
