import Enemy from "./Enemy.js";

// We have just 4 beetlemorphes from the sprite
const RHINOMORPH_TYPES = 4;
// Max frame is 2 according to the sprite
const MAX_FRAME = 5;
const LIVES = 4;

class Rhinomorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);

    this.image = document.getElementById("rhinomorph");
    this.maxFrame = MAX_FRAME;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * RHINOMORPH_TYPES);

    this.lives = LIVES;
    this.maxLives = this.lives;
  }

  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export default Rhinomorph;
