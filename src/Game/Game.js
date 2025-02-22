import Player from "./Player.js";
import Projectile from "./Projectiles.js";
import Wave from "./Wave.js";
import Boss from "./Enemies/Boss.js";
import EnemyProjectile from "./EnemyProjectile.js";

const PROJECTILES_POOL_CAPACITY = 15;
const ENTER_KEY = "Enter";
const LOWER_CASE_R_BTN = "r";
const ENEMY_GRID_ROWS = 2;
const ENEMY_GRID_COLS = 2;
const ENEMY_SIZE = 80;
const SPRITE_INTERVAL = 120;
// Every (wave % BOSS_SPAWN_FREQUENCY) === 0
const BOSS_SPAWN_FREQUENCY = 2;
const BOSS_LIVE_REWARD = 3;

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
    // this.waves.push(new Wave(this));
    this.waveCount = 1;

    // Enemy projectiles pool
    this.enemyProjectilesPool = [];
    this.numberOfEnemyProjectiles = PROJECTILES_POOL_CAPACITY;
    this.createEnemyProjectiles();

    // Statistics
    this.score = 0;
    this.gameOver = false;

    // Time slicing
    this.spriteUpdate = false;
    this.spriteTimer = 0;
    this.spriteInterval = SPRITE_INTERVAL;

    // Bosses
    this.bosses = [];
    this.restart();

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

  render(context, deltaTime) {
    // sprite timing
    if (this.spriteTimer > this.spriteInterval) {
      this.spriteUpdate = true;
      this.spriteTimer = 0;
    } else {
      this.spriteUpdate = false;
      this.spriteTimer += deltaTime;
    }

    this.drawStatusText(context);
    this.projectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });

    this.enemyProjectilesPool.forEach((projectile) => {
      projectile.update();
      projectile.draw(context);
    });

    this.bosses.forEach((boss) => {
      boss.draw(context);
      boss.update();
    });
    this.bosses = this.bosses.filter((boss) => !boss.markedForDeletion);

    this.player.draw(context);
    this.player.update();

    this.waves.forEach((wave) => {
      wave.render(context);
      if (
        wave.enemies.length < 1 &&
        !wave.nextWaveTriggered &&
        !this.gameOver
      ) {
        this.newWave();
        wave.nextWaveTriggered = true;
        this.player.lives += 1;
        // adding extra live
        if (this.player.lives < this.player.maxLives) {
          this.player.maxLives += 1;
        }
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
  getEnemyProjectile() {
    return this.enemyProjectilesPool.find((projectile) => projectile.free);
  }
  // create enemy projectiles object pool
  createEnemyProjectiles() {
    for (let i = 0; i < this.numberOfEnemyProjectiles; i++) {
      this.enemyProjectilesPool.push(new EnemyProjectile(this));
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

    for (let i = 0; i < this.player.maxLives; i++) {
      context.strokeRect(20 + 20 * i, 100, 10, 15);
    }

    for (let i = 0; i < this.player.lives; i++) {
      context.fillRect(20 + 20 * i, 100, 10, 15);
    }

    // energy
    context.save();
    this.player.cooldown
      ? (context.fillStyle = "red")
      : (context.fillStyle = "gold");

    for (let i = 0; i < this.player.energy; i++) {
      context.fillRect(15 + 2 * i, 130, 2, 15);
    }
    context.restore();

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
    this.waveCount++;

    if (this.player.lives < this.player.maxLives) {
      this.player.lives += BOSS_LIVE_REWARD;
    }

    if (this.waveCount % BOSS_SPAWN_FREQUENCY === 0) {
      this.bosses.push(new Boss(this, this.bossLives));
    } else {
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

    // removing wave for deletion from the waves
    this.waves = this.waves.filter((wave) => !wave.markedForDeletion);
  }
  restart() {
    this.player.restart();

    // Set of enemies will be organized as grid
    this.columns = ENEMY_GRID_ROWS;
    this.rows = ENEMY_GRID_COLS;

    this.bosses = [];
    this.bossLives = 10;

    // Enemy waves
    // this.waves = [new Wave(this)];
    this.waves.push(new Wave(this));
    // this.bosses.push(new Boss(this, this.bossLives));
    this.waveCount = 1;

    this.score = 0;
    this.gameOver = false;
  }
}

export default Game;
