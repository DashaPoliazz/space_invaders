const WIDTH = 4;
const HEIGHT = 40;
const SPEED = 20;

class Projectile {
  constructor() {
    this.width = WIDTH;
    this.height = HEIGHT;

    this.x = 0;
    this.y = 0;

    this.speed = SPEED;

    // When 'free' is false it means that we pulled it from the pool
    this.free = true;
  }

  draw(context) {
    if (!this.free) {
      context.save();
      context.fillStyle = "gold";
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
    }
  }
  update() {
    if (!this.free) {
      this.y -= this.speed;
      if (this.y < -this.height) this.reset();
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

export default Projectile;
