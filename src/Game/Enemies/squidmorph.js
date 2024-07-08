import Enemy from "./Enemy.js";

// We have just 4 beetlemorphes from the sprite
const RHINOMORPH_TYPES = 4;
// Max frame is 2 according to the sprite
const MAX_FRAME = 16;
const LIVES = 4;

class Squidmorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);

    this.image = document.getElementById("squidmorph");
    this.maxFrame = MAX_FRAME;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * RHINOMORPH_TYPES);

    this.lives = LIVES;
    this.maxLives = this.lives;
  }

  hit(damage) {
    this.lives -= damage;
    if (this.lives >= 1) {
      this.frameX = this.maxLives - Math.floor(this.lives);
    }
  }
}

export default Squidmorph;
