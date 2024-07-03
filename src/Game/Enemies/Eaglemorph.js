import Enemy from "./Enemy.js";

// We have just 4 beetlemorphes from the sprite
const RHINOMORPH_TYPES = 4;
// Max frame is 2 according to the sprite
const MAX_FRAME = 8;
const LIVES = 4;
const SHOTS = 4;

class Eaglemorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);

    this.image = document.getElementById("eaglemorph");
    this.maxFrame = MAX_FRAME;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * RHINOMORPH_TYPES);

    this.lives = LIVES;
    this.maxLives = this.lives;
    this.shots = 0;
  }

  hit(damage) {
    if (this.shots < 4) this.shoot();
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
    this.y += 3;
  }

  shoot() {
    const projectile = this.game.getEnemyProjectile();
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      this.shots++;
    }
    console.log(projectile);
  }
}

export default Eaglemorph;
