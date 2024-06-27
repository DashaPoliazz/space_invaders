import Enemy from "./Enemy.js";

// We have just 4 beetlemorphes from the sprite
const BEETLEMORPH_TYPES = 4;
// Max frame is 2 according to the sprite
const MAX_FRAME = 2;
const LIVES = 1;

class Beetlemorph extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);

    this.image = document.getElementById("beetlemorph");
    this.maxFrame = MAX_FRAME;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * BEETLEMORPH_TYPES);

    this.lives = LIVES;
    this.maxLives = this.lives;
  }
}

export default Beetlemorph;
