import Player from "./Player.js";
import Projectile from "./Projectiles.js";

const PROJECTILES_POOL_CAPACITY = 10;
const ENTER_KEY = "Enter";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.player = new Player(this);

    this.keys = new Set();

    // Projectile pool
    this.projectilesPool = [];
    this.numberOfProjectiles = PROJECTILES_POOL_CAPACITY;
    this.createProjectiles();
    console.log(this.projectilesPool);

    // Event listeners
    window.addEventListener("keydown", ({ key }) => {
      this.keys.add(key);
      if (key === ENTER_KEY) this.player.shoot();
    });
    window.addEventListener("keyup", ({ key }) => {
      this.keys.delete(key);
    });
  }

  render(context) {
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });
  }
  // create projectiles object pool
  createProjectiles() {
    for (let i = 0; i < this.numberOfProjectiles; i++) {
      this.projectilesPool.push(new Projectile());
    }
  }
  // get free projectile object from the pool
  getProjectile() {
    return this.projectilesPool.find((projectile) => projectile.free);
  }
}

export default Game;
