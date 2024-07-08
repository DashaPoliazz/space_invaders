const WIDTH = 50;
const HEIGHT = 35;
const HORIZONTAL_PROJECTILES = 4;
const VERTICAL_PROJECTILES = 2;
const LIVES = 5;

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

    this.lives = LIVES;
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
      // check collision between enemy projectile / player
      if (this.game.checkCollision(this, this.game.player)) {
        this.reset();
        this.game.player.lives -= 1;
        if (this.game.player.lives < 1) this.game.gameOver = true;
      }

      this.game.projectilesPool.forEach((projectile) => {
        if (this.game.checkCollision(this, projectile) && !projectile.free) {
          projectile.reset();
          this.hit(1);
          if (this.lives < 1) {
            this.reset();
          }
        }
      });
    }
  }
  start(x, y) {
    this.x = x - this.width * 0.5;
    this.y = y;
    this.free = false;
    this.frameX = Math.floor(Math.random() * 4);
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = LIVES;
    this.speed = Math.random() * 3 + 2;
  }
  reset() {
    this.free = true;
  }
  hit(damage) {
    this.lives -= damage;
    this.speed *= 0.6;
  }
}

export default EnemyProjectile;
