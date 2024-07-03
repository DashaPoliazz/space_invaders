import Laser from "./Laser.js";

const BIG_LAZER_SIZE = 20;
const DAMAGE = 1;

class BigLaser extends Laser {
  constructor(game) {
    super(game);

    this.width = BIG_LAZER_SIZE;
    this.damage = DAMAGE;
  }
  render(context) {
    if (this.game.player.energy > 1 && !this.game.player.cooldown) {
      super.render(context);
      this.game.player.frameX = 3;
    }
  }
}

export default BigLaser;
