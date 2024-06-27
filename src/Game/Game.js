import Player from "./Player.js";
import Projectile from "./Projectiles.js";
import Wave from "./Wave.js";

const PROJECTILES_POOL_CAPACITY = 10;
const ENTER_KEY = "Enter";
const LOWER_CASE_R_BTN = "r";
const ENEMY_GRID_ROWS = 2;
const ENEMY_GRID_COLS = 2;
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
    this.fired = false;

    // Set of enemies will be organized as grid
    this.columns = ENEMY_GRID_ROWS;
    this.rows = ENEMY_GRID_COLS;
    this.enemySize = ENEMY_SIZE;

    // Enemy waves
    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;

    // Event listeners
    window.addEventListener("keydown", ({ key }) => {
      if (key === ENTER_KEY && !this.fired) this.player.shoot();
      this.keys.add(key);
      this.fired = true;
      if (key === LOWER_CASE_R_BTN && this.gameOver) this.restart();
    });
    window.addEventListener("keyup", ({ key }) => {
      this.fired = false;
      this.keys.delete(key);
    });
  }

  render(context) {
    this.drawStatusText(context);
    this.player.draw(context);
    this.player.update();
    this.projectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });
    this.waves.forEach((wave) => {
      wave.render(context);
      if (
        wave.enemies.length < 1 &&
        !wave.nextWaveTriggered &&
        !this.gameOver
      ) {
        this.newWave();
        this.waveCount++;
        wave.nextWaveTriggered = true;
        this.player.lives += 1;
      }
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
  drawStatusText(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.fillText("Wave: " + this.waveCount, 20, 80);
    context.fillText("Score: " + this.score, 20, 40);

    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 10 * i, 100, 5, 20);
    }

    if (this.gameOver) {
      context.textAlign = "center";
      context.font = "100px Impact";
      context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.5);
      context.font = "30px Impact";
      context.fillText(
        "Press R to restart",
        this.width * 0.5,
        this.height * 0.5 + 30,
      );
    }
    context.restore();
  }
  newWave() {
    if (
      Math.random() < 0.5 &&
      this.columns * this.enemySize < this.width * 0.8
    ) {
      this.columns++;
    } else if (this.rows * this.enemySize < this.height * 0.6) {
      this.rows++;
    }

    this.waves.push(new Wave(this));
  }
  restart() {
    this.player.restart();

    // Set of enemies will be organized as grid
    this.columns = ENEMY_GRID_ROWS;
    this.rows = ENEMY_GRID_COLS;

    // Enemy waves
    this.waves = [];
    this.waves.push(new Wave(this));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;
  }
}

export default Game;
