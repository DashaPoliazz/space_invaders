import Player from "./Player.js";
import Projectile from "./Projectiles.js";
import Wave from "./Wave.js";

const PROJECTILES_POOL_CAPACITY = 10;
const ENTER_KEY = "Enter";
const ENEMY_GRID_ROWS = 3;
const ENEMY_GRID_COLS = 3;
const ENEMY_SIZE = 60;

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

    // Set of enemies will be organized as grid
    this.columns = ENEMY_GRID_ROWS;
    this.rows = ENEMY_GRID_COLS;
    this.enemySize = ENEMY_SIZE;

    // Enemy waves
    this.waves = [];
    this.waves.push(new Wave(this));

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
    this.waves.forEach((wave) => {
      wave.render(context);
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
  // collision detection between 2 rectangles
  checkCollision(a, b) {
    // collision
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }
}

export default Game;
